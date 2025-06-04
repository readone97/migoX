export interface Token {
    address: string
    chainId: number
    decimals: number
    name: string
    symbol: string
    logoURI?: string
    tags?: string[]
    extensions?: Record<string, any>
    coingeckoScore?: number
  }
  export interface Bank {
  id: string;
  code: string;
  name: string;
}

export interface AccountDetails {
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
}

export interface BankVerificationResult {
  status: boolean;
  message: string;
  data?: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
}

export interface AccountContextType {
  accountDetails: AccountDetails | null;
  saveAccount: (details: AccountDetails) => void;
  isLoading: boolean;
  error: string | null;
}

export interface VerificationHookResult {
  accountName: string;
  isLoading: boolean;
  error: string | null;
  verifyAccount: (accountNumber: string, bankCode: string) => Promise<void>;
}