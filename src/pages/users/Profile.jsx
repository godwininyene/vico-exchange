import { useState } from 'react';
import { FiUser, FiLock, FiCreditCard, FiCamera, FiCheck, FiX } from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editBank, setEditBank] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+2348012345678',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [bankData, setBankData] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
  });
  const [banks] = useState([
    'Zenith Bank',
    'GTBank',
    'Access Bank',
    'First Bank',
    'UBA',
    'Fidelity Bank',
    'Stanbic IBTC',
    'Union Bank',
  ]);
  const [userBanks, setUserBanks] = useState([
    { id: 1, bankName: 'Zenith Bank', accountNumber: '1234567890', accountName: 'John Doe' },
    { id: 2, bankName: 'GTBank', accountNumber: '0987654321', accountName: 'John Doe' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPersonal = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Personal info updated:', formData);
    setEditMode(false);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Here you would typically send the data to your backend
    console.log('Password changed:', passwordData);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setEditPassword(false);
  };

  const handleAddBank = (e) => {
    e.preventDefault();
    // Validate bank details
    if (!bankData.bankName || !bankData.accountNumber || !bankData.accountName) {
      alert("Please fill all bank details!");
      return;
    }
    // Here you would typically send the data to your backend
    const newBank = {
      id: userBanks.length + 1,
      ...bankData
    };
    setUserBanks(prev => [...prev, newBank]);
    setBankData({ bankName: '', accountNumber: '', accountName: '' });
    setEditBank(false);
  };

  const handleRemoveBank = (id) => {
    setUserBanks(prev => prev.filter(bank => bank.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">Profile Settings</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center py-3 px-4 font-medium text-sm ${activeTab === 'personal' ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <FiUser className="mr-2" />
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center py-3 px-4 font-medium text-sm ${activeTab === 'security' ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <FiLock className="mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center py-3 px-4 font-medium text-sm ${activeTab === 'account' ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <FiCreditCard className="mr-2" />
            Bank Accounts
          </button>
        </div>

        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Personal Information</h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-primary-dark dark:text-primary-light hover:underline"
                >
                  Edit Profile
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

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                  />
                  {editMode && (
                    <label className="absolute bottom-0 right-0 bg-primary-dark dark:bg-primary-light text-white p-2 rounded-full cursor-pointer hover:bg-primary-light dark:hover:bg-primary-dark">
                      <FiCamera className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
                {editMode && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Click on the camera icon to change your profile photo
                  </p>
                )}
              </div>

              <div className="flex-1">
                {editMode ? (
                  <form onSubmit={handleSubmitPersonal}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-4 bg-primary-dark hover:bg-primary-light text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="text-gray-800 dark:text-white font-medium">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                      <p className="text-gray-800 dark:text-white font-medium">{formData.email}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                      <p className="text-gray-800 dark:text-white font-medium">{formData.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
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
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    required
                    minLength="8"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    required
                    minLength="8"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-primary-dark hover:bg-primary-light text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Update Password
                </button>
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
        )}

        {/* Bank Accounts Tab */}
        {activeTab === 'account' && (
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

            {editBank ? (
              <form onSubmit={handleAddBank} className="max-w-md mb-8">
                <div className="mb-4">
                  <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bank Name
                  </label>
                  <select
                    id="bankName"
                    name="bankName"
                    value={bankData.bankName}
                    onChange={handleBankChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    required
                  >
                    <option value="">Select Bank</option>
                    {banks.map(bank => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    value={bankData.accountNumber}
                    onChange={handleBankChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    value={bankData.accountName}
                    onChange={handleBankChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-primary-dark hover:bg-primary-light text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Add Bank Account
                </button>
              </form>
            ) : null}

            <div className="space-y-4">
              {userBanks.length > 0 ? (
                userBanks.map(bank => (
                  <div key={bank.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">{bank.bankName}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{bank.accountNumber}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{bank.accountName}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveBank(bank.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2"
                    >
                      <FiX className="w-5 h-5" />
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
        )}
      </div>
    </div>
  );
};

export default Profile;