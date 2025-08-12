import { useState } from 'react';
import { 
  FiSettings, 
  FiLock, 
  FiDollarSign, 
  FiMail, 
  FiCheck,
  FiX,
  FiCreditCard,
  FiUsers,
  FiGlobe
} from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [editMode, setEditMode] = useState(false);
  const [editSecurity, setEditSecurity] = useState(false);
  const [editRates, setEditRates] = useState(false);
  
  // General settings
  const [generalData, setGeneralData] = useState({
    platformName: 'Vico',
    adminEmail: 'admin@vico.com',
    supportEmail: 'support@vico.com',
    defaultCurrency: 'NGN',
    maintenanceMode: false
  });

  // Security settings
  const [securityData, setSecurityData] = useState({
    twoFactorAuth: true,
    loginAttempts: 5,
    sessionTimeout: 30, // minutes
    passwordComplexity: 'medium'
  });

  // Rates settings
  const [ratesData, setRatesData] = useState({
    rateMargin: 1.5, // percentage
    autoUpdate: true,
    updateFrequency: 60 // minutes
  });

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Bank Transfer', status: true },
    { id: 2, name: 'Flutterwave', status: true },
    { id: 3, name: 'Paystack', status: false }
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleRatesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRatesData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const togglePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, status: !method.status } : method
    ));
  };

  const saveGeneralSettings = (e) => {
    e.preventDefault();
    console.log('General settings updated:', generalData);
    setEditMode(false);
  };

  const saveSecuritySettings = (e) => {
    e.preventDefault();
    console.log('Security settings updated:', securityData);
    setEditSecurity(false);
  };

  const saveRatesSettings = (e) => {
    e.preventDefault();
    console.log('Rates settings updated:', ratesData);
    setEditRates(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Settings</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center py-3 px-4 font-medium text-sm ${activeTab === 'general' ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <FiSettings className="mr-2" />
            General
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center py-3 px-4 font-medium text-sm ${activeTab === 'security' ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <FiLock className="mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`flex items-center py-3 px-4 font-medium text-sm ${activeTab === 'rates' ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <FiDollarSign className="mr-2" />
            Rates
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center py-3 px-4 font-medium text-sm ${activeTab === 'payments' ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            <FiCreditCard className="mr-2" />
            Payments
          </button>
        </div>

        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">General Settings</h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-primary-dark dark:text-primary-light hover:underline"
                >
                  Edit Settings
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
              <form onSubmit={saveGeneralSettings}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="platformName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      id="platformName"
                      name="platformName"
                      value={generalData.platformName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        id="adminEmail"
                        name="adminEmail"
                        value={generalData.adminEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Support Email
                      </label>
                      <input
                        type="email"
                        id="supportEmail"
                        name="supportEmail"
                        value={generalData.supportEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Default Currency
                    </label>
                    <select
                      id="defaultCurrency"
                      name="defaultCurrency"
                      value={generalData.defaultCurrency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    >
                      <option value="NGN">Naira (NGN)</option>
                      <option value="USD">Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      name="maintenanceMode"
                      checked={generalData.maintenanceMode}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
                    />
                    <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Maintenance Mode
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="mt-6 bg-primary-dark hover:bg-primary-light text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Platform Name</p>
                  <p className="text-gray-800 dark:text-white font-medium">{generalData.platformName}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Admin Email</p>
                    <p className="text-gray-800 dark:text-white font-medium">{generalData.adminEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Support Email</p>
                    <p className="text-gray-800 dark:text-white font-medium">{generalData.supportEmail}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Default Currency</p>
                  <p className="text-gray-800 dark:text-white font-medium">{generalData.defaultCurrency}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Maintenance Mode</p>
                  <p className={`font-medium ${
                    generalData.maintenanceMode 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {generalData.maintenanceMode ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Settings Tab */}
        {activeTab === 'security' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Security Settings</h2>
              {!editSecurity ? (
                <button
                  onClick={() => setEditSecurity(true)}
                  className="text-primary-dark dark:text-primary-light hover:underline"
                >
                  Edit Settings
                </button>
              ) : (
                <button
                  onClick={() => setEditSecurity(false)}
                  className="text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>

            {editSecurity ? (
              <form onSubmit={saveSecuritySettings}>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="twoFactorAuth"
                      name="twoFactorAuth"
                      checked={securityData.twoFactorAuth}
                      onChange={handleSecurityChange}
                      className="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
                    />
                    <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Require Two-Factor Authentication
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="loginAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      id="loginAttempts"
                      name="loginAttempts"
                      value={securityData.loginAttempts}
                      onChange={handleSecurityChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      id="sessionTimeout"
                      name="sessionTimeout"
                      value={securityData.sessionTimeout}
                      onChange={handleSecurityChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                      min="5"
                      max="1440"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="passwordComplexity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password Complexity
                    </label>
                    <select
                      id="passwordComplexity"
                      name="passwordComplexity"
                      value={securityData.passwordComplexity}
                      onChange={handleSecurityChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                    >
                      <option value="low">Low (6+ characters)</option>
                      <option value="medium">Medium (8+ with mix of letters and numbers)</option>
                      <option value="high">High (10+ with special characters)</option>
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="mt-6 bg-primary-dark hover:bg-primary-light text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Two-Factor Authentication</p>
                  <p className={`font-medium ${
                    securityData.twoFactorAuth 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {securityData.twoFactorAuth ? 'Required' : 'Not Required'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Max Login Attempts</p>
                  <p className="text-gray-800 dark:text-white font-medium">{securityData.loginAttempts}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Session Timeout</p>
                  <p className="text-gray-800 dark:text-white font-medium">{securityData.sessionTimeout} minutes</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Password Complexity</p>
                  <p className="text-gray-800 dark:text-white font-medium capitalize">{securityData.passwordComplexity}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rates Settings Tab */}
        {activeTab === 'rates' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Rates Settings</h2>
              {!editRates ? (
                <button
                  onClick={() => setEditRates(true)}
                  className="text-primary-dark dark:text-primary-light hover:underline"
                >
                  Edit Settings
                </button>
              ) : (
                <button
                  onClick={() => setEditRates(false)}
                  className="text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>

            {editRates ? (
              <form onSubmit={saveRatesSettings}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="rateMargin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rate Margin (%)
                    </label>
                    <input
                      type="number"
                      id="rateMargin"
                      name="rateMargin"
                      value={ratesData.rateMargin}
                      onChange={handleRatesChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                      min="0"
                      max="10"
                      step="0.1"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoUpdate"
                      name="autoUpdate"
                      checked={ratesData.autoUpdate}
                      onChange={handleRatesChange}
                      className="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
                    />
                    <label htmlFor="autoUpdate" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Auto Update Rates
                    </label>
                  </div>
                  
                  {ratesData.autoUpdate && (
                    <div>
                      <label htmlFor="updateFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Update Frequency (minutes)
                      </label>
                      <input
                        type="number"
                        id="updateFrequency"
                        name="updateFrequency"
                        value={ratesData.updateFrequency}
                        onChange={handleRatesChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                        min="5"
                        max="1440"
                        required
                      />
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="mt-6 bg-primary-dark hover:bg-primary-light text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rate Margin</p>
                  <p className="text-gray-800 dark:text-white font-medium">{ratesData.rateMargin}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Auto Update Rates</p>
                  <p className={`font-medium ${
                    ratesData.autoUpdate 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {ratesData.autoUpdate ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                
                {ratesData.autoUpdate && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update Frequency</p>
                    <p className="text-gray-800 dark:text-white font-medium">{ratesData.updateFrequency} minutes</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Payment Methods</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable/disable available payment methods
              </p>
            </div>

            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div key={method.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{method.name}</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={method.status}
                      onChange={() => togglePaymentMethod(method.id)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark dark:peer-checked:bg-primary-light`}>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {method.status ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;