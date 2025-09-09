import { useState, useEffect } from 'react';
import InputField from './InputField';
import Button from './Button';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import { useSettings } from '../hooks/useSettings';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';

const GeneralSettingsTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { generalData, setGeneralData, isFetching, refetch } = useSettings();


  const updateSettings = async (settingsData) => {
    try {
      const response = await axios.patch('api/v1/settings', settingsData);
      return response.data;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name.startsWith('social_')) {
      // Handle social media links
      const socialPlatform = name.replace('social_', '');
      setGeneralData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialPlatform]: value
        }
      }));
    } else {
      // Handle regular fields
      setGeneralData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const saveGeneralSettings = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      // Prepare data for API
      const settingsData = {
        platformName: generalData.platformName,
        adminEmail: generalData.adminEmail || null,
        supportEmail: generalData.supportEmail || null,
        supportPhone: generalData.supportPhone || null,
        defaultCurrency: generalData.defaultCurrency,
        maintenanceMode: generalData.maintenanceMode,
        facebookUrl: generalData.socialLinks.facebook || null,
        twitterUrl: generalData.socialLinks.twitter || null,
        instagramUrl: generalData.socialLinks.instagram || null,
        linkedinUrl: generalData.socialLinks.linkedin || null,
        youtubeUrl: generalData.socialLinks.youtube || null,
        tiktokUrl: generalData.socialLinks.tiktok || null
      };

      await updateSettings(settingsData);
      toast.success('Settings updated successfully!');
      setEditMode(false);

      // Refetch settings to ensure we have the latest data
      await refetch();
    } catch (err) {
      console.log('Error updating settings:', err);
      // Extract errors from the backend response
      if (err.response?.data?.errors) {
        const backendErrors = err.response.data.errors;
        const formattedErrors = {};

        // Map backend field names to frontend field names
        Object.keys(backendErrors).forEach(field => {
          if (field.endsWith('Url')) {
            // Convert backend field names like "instagramUrl" to frontend names like "social_instagram"
            const socialKey = field.replace('Url', '');
            formattedErrors[`social_${socialKey}`] = backendErrors[field];
          } else {
            formattedErrors[field] = backendErrors[field];
          }
        });

        setErrors(formattedErrors);
      } else {
        toast.error(err.response?.data?.message || 'Failed to update settings');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Social media platforms with their icons
  const socialPlatforms = [
    { key: 'facebook', name: 'Facebook', icon: <FaFacebook className="text-blue-600" /> },
    { key: 'twitter', name: 'Twitter', icon: <FaTwitter className="text-blue-400" /> },
    { key: 'instagram', name: 'Instagram', icon: <FaInstagram className="text-pink-600" /> },
    { key: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin className="text-blue-700" /> },
    { key: 'youtube', name: 'YouTube', icon: <FaYoutube className="text-red-600" /> },
    { key: 'tiktok', name: 'TikTok', icon: <FaTiktok className="text-black dark:text-white" /> }
  ];

  // Show loading state while fetching settings
  if (isFetching) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
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
        <form onSubmit={saveGeneralSettings} className="space-y-6">
          {/* Platform Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Platform Settings</h3>

            <InputField
              label="Platform Name"
              name="platformName"
              placeholder="Enter platform name"
              value={generalData.platformName}
              onChange={handleInputChange}
              isRequired={false}
              error={errors.platformName}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Admin Email"
                name="adminEmail"
                type="email"
                placeholder="Enter admin email"
                value={generalData.adminEmail}
                onChange={handleInputChange}
                isRequired={false}
                error={errors.adminEmail}
              />

              <InputField
                label="Support Email"
                name="supportEmail"
                type="email"
                placeholder="Enter support email"
                value={generalData.supportEmail}
                onChange={handleInputChange}
                isRequired={false}
                error={errors.supportEmail}
              />
            </div>
            <InputField
              label="Support Phone"
              name="supportPhone"
              placeholder="Enter support phone"
              value={generalData.supportPhone}
              onChange={handleInputChange}
              isRequired={false}
              error={errors.supportPhone}
            />

            {/* <div>
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
            </div> */}

            {/* <div className="flex items-center">
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
            </div> */}
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Social Media Links</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialPlatforms.map((platform) => (
                <div key={platform.key} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {platform.icon}
                  </div>
                  <InputField
                    label={platform.name}
                    name={`social_${platform.key}`}
                    placeholder={`Enter ${platform.name} URL`}
                    value={generalData.socialLinks[platform.key]}
                    onChange={handleInputChange}
                    isRequired={false}
                    error={errors[`social_${platform.key}`]}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Saving..."
            disabled={isLoading}
            className="mt-6 font-medium py-2 px-6 rounded-lg"
          >
            Save Changes
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Platform Settings View */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Platform Settings</h3>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Platform Name</p>
              <p className="text-gray-800 dark:text-white font-medium">{generalData.platformName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin Email</p>
                <p className="text-gray-800 dark:text-white font-medium">{generalData.adminEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Support Email</p>
                <p className="text-gray-800 dark:text-white font-medium">{generalData.supportEmail}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Support Phone</p>
                <p className="text-gray-800 dark:text-white font-medium">{generalData.supportPhone}</p>
              </div>
            </div>

            {/* <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Default Currency</p>
              <p className="text-gray-800 dark:text-white font-medium">{generalData.defaultCurrency}</p>
            </div> */}

            {/* <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Maintenance Mode</p>
              <p className={`font-medium ${generalData.maintenanceMode
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
                }`}>
                {generalData.maintenanceMode ? 'Enabled' : 'Disabled'}
              </p>
            </div> */}
          </div>

          {/* Social Media Links View */}
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Social Media Links</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {socialPlatforms.map((platform) => (
                generalData.socialLinks[platform.key] && (
                  <div key={platform.key} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-shrink-0">
                      {platform.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {platform.name}
                      </p>
                      <a
                        href={generalData.socialLinks[platform.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                )
              ))}

              {!Object.values(generalData.socialLinks).some(link => link) && (
                <div className="col-span-full text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">No social media links added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSettingsTab;