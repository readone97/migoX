"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AccountDetails, AccountContextType } from '../types';
import { toast } from 'react-toastify';

const defaultContext: AccountContextType = {
  accountDetails: null,
  saveAccount: () => {},
  isLoading: false,
  error: null,
};

const AccountContext = createContext<AccountContextType>(defaultContext);

export const useAccountContext = () => useContext(AccountContext);

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const saveAccount = (details: AccountDetails) => {
    setAccountDetails(details);
    setError(null);
    toast.success('Account saved successfully', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <AccountContext.Provider
      value={{
        accountDetails,
        saveAccount,
        isLoading,
        error,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};