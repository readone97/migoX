import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Bank } from '../types';
import { fetchBanks } from '../services/bankApi';

interface BankSelectorProps {
  selectedBank: string;
  onSelectBank: (code: string) => void;
  disabled?: boolean;
}

const BankSelector: React.FC<BankSelectorProps> = ({ 
  selectedBank, 
  onSelectBank,
  disabled = false
}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const banksData = await fetchBanks();
        setBanks(banksData);
      } catch (err) {
        setError('Failed to load banks');
        console.error('Error loading banks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanks();
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectBank = (code: string, name: string) => {
    onSelectBank(code);
    setIsOpen(false);
  };

  const getSelectedBankName = (): string => {
    if (!selectedBank) return 'Select Bank';
    const bank = banks.find(b => b.code === selectedBank);
    return bank ? bank.name : 'Select Bank';
  };

  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div 
        className={`
          flex items-center justify-between p-3 border rounded-lg cursor-pointer
          transition-all duration-200 ease-in-out text-white
          ${disabled ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:border-green-500'}
          ${selectedBank ? 'border-green-500' : 'border-gray-700'}
        `}
        onClick={toggleDropdown}
      >
        <span className={`${selectedBank ? 'text-white' : 'text-gray-400'}`}>
          {isLoading ? 'Loading banks...' : getSelectedBankName()}
        </span>
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gray-800">
            <input
              type="text"
              placeholder="Search banks..."
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {error ? (
              <div className="p-3 text-red-400">{error}</div>
            ) : isLoading ? (
              <div className="p-3 text-gray-400">Loading banks...</div>
            ) : filteredBanks.length === 0 ? (
              <div className="p-3 text-gray-400">No banks found</div>
            ) : (
              filteredBanks.map((bank) => (
                <div
                  key={bank.id}
                  className="p-3 hover:bg-gray-800 cursor-pointer transition-colors duration-150 text-white"
                  onClick={() => handleSelectBank(bank.code, bank.name)}
                >
                  {bank.name}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSelector;