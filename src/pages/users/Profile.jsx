import { useState } from 'react';
import ProfileTabs from '../../components/ProfileTabs';
import PersonalInfoTab from './../../components/PersonalInfoTab';
import SecurityTab from './../../components/SecurityTab';
import BankAccountsTab from './../../components/BankAccountsTab';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">Profile Settings</h1>
        
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} userRole='user'/>
        
        {activeTab === 'personal' && (
          <PersonalInfoTab/>
        )}
        
        {activeTab === 'security' && (
          <SecurityTab />
        )}
        
        {activeTab === 'account' && (
          <BankAccountsTab/>
        )}
      </div>
    </div>
  );
};

export default Profile;