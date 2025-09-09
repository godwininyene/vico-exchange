import { useState } from 'react';
import ProfileTabs from '../../components/ProfileTabs';
import PersonalInfoTab from './../../components/PersonalInfoTab';
import SecurityTab from './../../components/SecurityTab';
import GeneralSettingsTab from './../../components/GeneralSettingsTab';
import PaymentSettingsTab from './../../components/PaymentSettingsTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-8">Admin Settings</h1>

        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} userRole='admin'/>
        
        {activeTab === 'personal' && (
          <PersonalInfoTab />
        )}

        {activeTab === 'general' && (
          <GeneralSettingsTab />
        )}

        {activeTab === 'security' && (
          <SecurityTab />
        )}

        {activeTab === 'payment' && (
          <PaymentSettingsTab />
        )}
      </div>
    </div>
  );
};

export default Settings;