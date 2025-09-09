import { useState } from 'react';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import InputField from './InputField';
import Button from './Button';
const SecurityTab = () => {
  const [editPassword, setEditPassword] = useState(false);
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setErrors({})
    const data = new FormData(e.target);
    const dataToSend = Object.fromEntries(data)
    setIsLoading(true);
    try {
      const response = await axios.patch('/api/v1/users/updateMyPassword', dataToSend);

      if (response.data.status === 'success') {
        toast.success('Password updated successfully');
        e.target.reset();
      }
    } catch (error) {
      console.log('ERROR', error);
      toast.error(error.response?.data?.message || 'Failed to update password');
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Security Settings</h2>
        {!editPassword ? (
          <button
            onClick={() => setEditPassword(true)}
            className="text-primary-dark dark:text-primary-light hover:underline"
          >
            Change Password
          </button>
        ) : (
          <button
            onClick={() => setEditPassword(false)}
            className="text-gray-500 dark:text-gray-400 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      {editPassword ? (
        <form onSubmit={handleSubmitPassword} className="max-w-md">
          <InputField
            label="Current Password"
            name="passwordCurrent"
            type="password"
            placeholder={'Enter your current password'}
            value={passwordData.passwordCurrent}
            onChange={handlePasswordChange}
            error={errors.passwordCurrent}
          />

          <InputField
            label="New Password"
            name="password"
            type="password"
            placeholder={'Enter your new password'}
            value={passwordData.password}
            onChange={handlePasswordChange}
            error={errors.password}
          />

          <InputField
            label="Confirm New Password"
            name="passwordConfirm"
            type="password"
            placeholder={'Enter password confirm'}
            value={passwordData.passwordConfirm}
            onChange={handlePasswordChange}
            error={errors.passwordConfirm}
          />
      
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Saving..."
            className="mt-4 font-medium py-2 px-6 rounded-lg"
          >
            Update Password
          </Button>
        </form>
      ) : (
        <div className="max-w-md">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">
              For security reasons, we don't display your password. You can change your password here if needed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityTab;