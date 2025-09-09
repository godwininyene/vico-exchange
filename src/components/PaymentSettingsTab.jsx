import { useState } from 'react';
import BankDetails from './BankDetails';
import { useCompanyAccount } from '../hooks/useBankAccounts';

const PaymentSettingsTab = () => {
  const [editMode, setEditMode] = useState(false);
  const { bankData, loadingCompanyAccount, setBankData } = useCompanyAccount();

  const handleBankDataUpdate = (newBankData) => {
    // Update the bank data
    setBankData(newBankData);
  };

  // Show loading state while fetching company account data
  if (loadingCompanyAccount) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading payment settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Payment Settings</h2>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="text-primary-dark dark:text-primary-light hover:underline"
          >
            Edit Payment Details
          </button>
        ) : (
          <button
            onClick={() => setEditMode(false)}
            className="text-gray-500 dark:text-gray-400 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      {editMode ? (
        <BankDetails
          data={bankData}
          onChange={handleBankDataUpdate} 
          closeEditMode={() => setEditMode(false)}
          editMode={editMode}
        />
      ) : (
        <BankDetails 
          data={bankData} 
          editMode={editMode} 
        />
      )}
    </div>
  );
};

export default PaymentSettingsTab;