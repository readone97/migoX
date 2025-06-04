
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"; 
import { Check, Loader2 } from 'lucide-react';
import BankSelector from './BankSelector';
import { useBankVerification } from '../hooks/useBankVerification';
import { useAccountContext } from '../context/AccountContext';
import { getBankNameByCode } from '../services/bankApi';
import { Bank } from '../types';
import { fetchBanks } from '../services/bankApi';
import { Button } from './ui/button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BankAccountFormProps {
  onSuccess: (data: { bankName: string; accountNumber: string; accountName: string }) => void;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ onSuccess }) => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [selectedBankCode, setSelectedBankCode] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);

  const { accountName, isLoading, error, verifyAccount } = useBankVerification();
  const { saveAccount } = useAccountContext();
   const { toast } = useToast();

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const banksData = await fetchBanks();
        setBanks(banksData);
      } catch (err) {
        console.error('Error loading banks:', err);
      }
    };

    loadBanks();
  }, []);

  useEffect(() => {
    const isAccountNumberValid = accountNumber.length === 10;
    const isBankSelected = !!selectedBankCode;
    
    if (isAccountNumberValid && isBankSelected) {
      verifyAccount(accountNumber, selectedBankCode);
    }
  }, [accountNumber, selectedBankCode, verifyAccount]);

  useEffect(() => {
    if (selectedBankCode && banks.length > 0) {
      setBankName(getBankNameByCode(banks, selectedBankCode));
    } else {
      setBankName('');
    }
  }, [selectedBankCode, banks]);

  useEffect(() => {
    setIsFormComplete(
      accountNumber.length === 10 && 
      !!selectedBankCode && 
      !!accountName && 
      !isLoading && 
      !error
    );
  }, [accountNumber, selectedBankCode, accountName, isLoading, error]);

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAccountNumber(value);
  };

  const handleSelectBank = (code: string) => {
    setSelectedBankCode(code);
  };

  
//   const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();

//   if (isFormComplete) {
//     saveAccount({
//       accountNumber,
//       accountName,
//       bankCode: selectedBankCode,
//       bankName,
//     });
//     // Notify parent of success
//     onSuccess({
//       bankName,
//       accountNumber,
//       accountName,
//     });
//   }
// };
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormComplete) {
      saveAccount({
        accountNumber,
        accountName,
        bankCode: selectedBankCode,
        bankName,
      });
      onSuccess({
        bankName,
        accountNumber,
        accountName,
      });
      toast({
        title: "Bank saved successfully",
        variant: "default",
      });
      // Reset form fields
      setAccountNumber("");
      setSelectedBankCode("");
      setBankName("");
      // Optionally reset accountName if your hook allows it
      // setAccountName("");
    }
  };


  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="bg-gray-900 shadow-xl rounded-xl p-6 border border-gray-800"
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Bank Account Details</h2>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="bank" className="block text-sm font-medium text-gray-300">
              Select Bank
            </label>
            <BankSelector 
              selectedBank={selectedBankCode} 
              onSelectBank={handleSelectBank}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-300">
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Enter 10-digit account number"
              disabled={isLoading}
              className={`
                w-full p-3 border rounded-lg transition-all duration-200 bg-gray-800 text-white
                ${accountNumber.length === 10 ? 'border-green-500' : 'border-gray-700'}
                ${isLoading ? 'bg-gray-700' : 'bg-gray-800'}
                focus:outline-none focus:ring-2 focus:ring-green-500
              `}
            />
            {accountNumber && accountNumber.length !== 10 && (
              <p className="text-sm text-amber-500">Account number must be 10 digits</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="accountName" className="block text-sm font-medium text-gray-300">
              Account Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="accountName"
                value={accountName}
                readOnly
                placeholder="Account name will appear here"
                className={`
                  w-full p-3 border rounded-lg bg-gray-800 text-white
                  ${accountName ? 'border-green-500' : 'border-gray-700'}
                `}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 size={20} className="animate-spin text-green-500" />
                </div>
              )}
              {accountName && !isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check size={20} className="text-green-500" />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-300">
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              readOnly
              placeholder="Bank name will appear here"
              className={`
                w-full p-3 border rounded-lg bg-gray-800 text-white
                ${bankName ? 'border-green-500' : 'border-gray-700'}
              `}
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-800 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          
          <Button
            type="submit"
            disabled={!isFormComplete}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white
              transition-all duration-200 flex items-center justify-center
              ${isFormComplete 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-700 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              'Save Account'
            )}
          </Button>
        </div>
          <ToastContainer position="top-right" />
      </form>
    </div>
  );
};

export default BankAccountForm;

