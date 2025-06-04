import { useState, useCallback } from 'react';
import { verifyBankAccount } from '../services/bankApi';
import { VerificationHookResult } from '../types';

// Cache for verified accounts
const accountCache = new Map<string, string>();

export const useBankVerification = (): VerificationHookResult => {
  const [accountName, setAccountName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifyAccount = useCallback(async (accountNumber: string, bankCode: string): Promise<void> => {
    // Reset states
    setAccountName('');
    setError(null);
    
    // Validation checks
    if (!accountNumber || accountNumber.length !== 10) {
      setError('Please enter a valid 10-digit account number');
      return;
    }

    if (!bankCode) {
      setError('Please select a bank');
      return;
    }

    // Check cache first
    const cacheKey = `${bankCode}-${accountNumber}`;
    if (accountCache.has(cacheKey)) {
      setAccountName(accountCache.get(cacheKey)!);
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyBankAccount(accountNumber, bankCode);
      
      if (response.status && response.data) {
        setAccountName(response.data.account_name);
        // Cache the result
        accountCache.set(cacheKey, response.data.account_name);
      } else {
        setError(response.message || 'Verification failed');
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
      console.error('Bank verification error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    accountName,
    isLoading,
    error,
    verifyAccount,
  };
};