import axios from 'axios';
import { Bank, BankVerificationResult } from '../types';

const PAYSTACK_API_URL = 'https://api.paystack.co';
const PAYSTACK_SECRET_KEY = 'sk_test_466033a9544dfeda78ea34cd123d1183ba3c15a0'
// const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY;

// Configure axios defaults for Paystack with timeout
const paystackApi = axios.create({
  baseURL: PAYSTACK_API_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 seconds timeout
});

// Cache for banks list
let banksCache: Bank[] | null = null;
let banksCacheExpiry: number | null = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const fetchBanks = async (): Promise<Bank[]> => {
  // Return cached banks if available and not expired
  if (banksCache && banksCacheExpiry && Date.now() < banksCacheExpiry) {
    return banksCache;
  }

  try {
    const response = await paystackApi.get('/bank');
    const banks = response.data.data.map((bank: any) => ({
      id: bank.id.toString(),
      code: bank.code,
      name: bank.name,
    }));

    // Update cache
    banksCache = banks;
    banksCacheExpiry = Date.now() + CACHE_DURATION;

    return banks;
  } catch (error) {
    console.error('Error fetching banks:', error);
    // Return cached banks if available, even if expired
    if (banksCache) {
      return banksCache;
    }
    throw new Error('Failed to fetch banks');
  }
};

// Implement request queue to prevent multiple simultaneous requests
const verificationQueue = new Map<string, Promise<BankVerificationResult>>();

export const verifyBankAccount = async (
  accountNumber: string,
  bankCode: string
): Promise<BankVerificationResult> => {
  const queueKey = `${bankCode}-${accountNumber}`;

  // If there's already a request in progress for this account, return that promise
  if (verificationQueue.has(queueKey)) {
    return verificationQueue.get(queueKey)!;
  }

  const verificationPromise = new Promise<BankVerificationResult>(async (resolve) => {
    try {
      const response = await paystackApi.get(
        `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
      );
      
      resolve({
        status: true,
        message: 'Account details retrieved',
        data: {
          account_number: accountNumber,
          account_name: response.data.data.account_name,
          bank_id: parseInt(bankCode),
        },
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Account verification failed';
      resolve({
        status: false,
        message: errorMessage,
      });
    } finally {
      // Remove from queue after completion
      setTimeout(() => verificationQueue.delete(queueKey), 100);
    }
  });

  // Add to queue
  verificationQueue.set(queueKey, verificationPromise);
  return verificationPromise;
};

export const getBankNameByCode = (banks: Bank[], code: string): string => {
  const bank = banks.find(bank => bank.code === code);
  return bank ? bank.name : '';
};