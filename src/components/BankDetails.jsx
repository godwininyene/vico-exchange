import { useState } from 'react';
import InputField from './InputField';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import Button from './Button';

const BankDetails = ({ data, onChange, editMode, closeEditMode }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bank: data?.bank || '',
    name: data?.name || '',
    number: data?.number || ''
  });
  
  // Update formData when data prop changes
  useState(() => {
    setFormData({
      bank: data?.bank || '',
      name: data?.name || '',
      number: data?.number || ''
    });
  }, [data]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    
    try {
      const res = await axios.post('api/v1/bankAccounts/admin', formData);
      if (res.data.status === 'success') {
        // Call onChange to update the parent component with the new data
        if (onChange) {
          onChange(res.data.data.account);
        }
        
        // Close edit mode if closeEditMode function is provided
        if (closeEditMode) {
          closeEditMode();
        }
        
        toast.success("Bank details submitted successfully!");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(
        err.response?.data?.message || "An error occurred during submission"
      );
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Bank Account Details</h3>

      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Bank Name"
              name="bank"
              placeholder="Enter bank name"
              value={formData.bank}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Account Name"
              name="name"
              placeholder="Enter account name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <InputField
            label="Account Number"
            name="number"
            placeholder="Enter account number"
            value={formData.number}
            onChange={handleInputChange}
            required
          />

          <Button
            type="submit"
            isLoading={loading}
            loadingText="Saving..."
            disabled={loading}
            className="mt-6 font-medium py-2 px-6 rounded-lg"
          >
            Save Changes
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bank Name</p>
              <p className="text-gray-800 dark:text-white font-medium">{data?.bank || 'Not set'}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Name</p>
              <p className="text-gray-800 dark:text-white font-medium">{data?.name || 'Not set'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
              <p className="text-gray-800 dark:text-white font-medium">{data?.number || 'Not set'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDetails;