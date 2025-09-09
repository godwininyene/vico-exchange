import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import InputField from './InputField';
import Button from './Button';
import { useBankAccounts } from '../hooks/useBankAccounts';

const BankAccountsTab = () => {
  const [editBank, setEditBank] = useState(false);
  const { userBanks, loadingAccounts, fetchBankAccounts, setUserBanks } = useBankAccounts();
  const [bankData, setBankData] = useState({
    bank: '',
    number: '',
    name: '',
  });
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [deletingBankId, setDeletingBankId] = useState(null);

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBank = async (e) => {
    e.preventDefault();
    setErrors({})
    setIsLoading(true)
    try {
      const res = await axios.post('api/v1/bankAccounts', bankData)
      if (res.data.status === 'success') {
        toast.success('Bank account added successfully');
        setBankData({ bank: '', number: '', name: '' }); // Reset form data
        setEditBank(false); // Close the form
        fetchBankAccounts(); // Refresh the list
      }
    } catch (err) {
      // Extract errors from the backend response
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: 'An unexpected error occurred' });
      }
      toast.error(err.response?.data?.message || 'Error saving bank account');
      console.log('Error:', err);
    } finally {
      setIsLoading(false)
    }
  };

  const handleRemoveBank = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bank account?')) {
      return;
    }

    setDeletingBankId(id);
    try {
      const res = await axios.delete(`api/v1/bankAccounts/${id}`);
      if (res.status === 204) {
        toast.success('Bank account deleted successfully');
        setUserBanks(prev => prev.filter(bank => bank.id !== id));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting bank account');
      console.log('Error:', err);
    } finally {
      setDeletingBankId(null);
    }
  };


  // Show loading state while fetching user's bank data
  if (loadingAccounts) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading bank accounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Bank Accounts</h2>
        {!editBank ? (
          <button
            onClick={() => setEditBank(true)}
            className="text-primary-dark dark:text-primary-light hover:underline"
          >
            Add Bank Account
          </button>
        ) : (
          <button
            onClick={() => setEditBank(false)}
            className="text-gray-500 dark:text-gray-400 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      {editBank && (
        <form onSubmit={handleAddBank} className="max-w-md mb-8">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}
          <InputField
            label="Bank Name"
            name="bank"
            placeholder={'Enter bank name'}
            value={bankData.bank}
            onChange={handleBankChange}
            error={errors.bank}
          />

          <InputField
            label="Account Number"
            name="number"
            placeholder={'Enter your account number'}
            value={bankData.number}
            onChange={handleBankChange}
            error={errors.number}
          />

          <InputField
            label="Account Name"
            name="name"
            placeholder={'Enter account holder name'}
            value={bankData.name}
            onChange={handleBankChange}
            error={errors.name}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Saving..."
            className="mt-4 font-medium py-2 px-6 rounded-lg"
          >
            Add Bank Account
          </Button>
        </form>
      )}

      <div className="space-y-4">
        {userBanks.length > 0 ? (
          userBanks.map(bank => (
            <div key={bank.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">{bank.bank}</h3>
                <p className="text-gray-600 dark:text-gray-400">{bank.number}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{bank.name}</p>
              </div>
              <button
                onClick={() => handleRemoveBank(bank.id)}
                disabled={deletingBankId === bank.id}
                className="cursor-pointer text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingBankId === bank.id ? (
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiX className="w-5 h-5" />
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-300">No bank accounts added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankAccountsTab;