import { FiUser, FiLock, FiCreditCard, FiSettings, FiDollarSign } from 'react-icons/fi';

const ProfileTabs = ({ activeTab, setActiveTab, userRole = 'user' }) => {
  // Define tabs for admin users
  const adminTabs = [
    { id: 'general', name: 'General', icon: <FiSettings className="mr-2" /> },
    { id: 'personal', name: 'Personal Info', icon: <FiUser className="mr-2" /> },
    { id: 'security', name: 'Security', icon: <FiLock className="mr-2" /> },
    { id: 'payment', name: 'Payment Settings', icon: <FiDollarSign className="mr-2" /> },
  ];

  // Define tabs for regular users
  const userTabs = [
    { id: 'personal', name: 'Personal Info', icon: <FiUser className="mr-2" /> },
    { id: 'security', name: 'Security', icon: <FiLock className="mr-2" /> },
    { id: 'account', name: 'Bank Accounts', icon: <FiCreditCard className="mr-2" /> },
  ];

  // Select the appropriate tabs based on user role
  const tabs = userRole === 'admin' ? adminTabs : userTabs;

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center py-3 px-4 font-medium text-sm whitespace-nowrap ${activeTab === tab.id ? 'text-primary-dark dark:text-primary-light border-b-2 border-primary-dark dark:border-primary-light' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          {tab.icon}
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;