import { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import InputField from './InputField';
import Button from './Button';

const PersonalInfoTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    photo: null
  });
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user data
  const getUser = async () => {
    try {
      const res = await axios.get('api/v1/users/me');
      if (res.data.status === 'success') {
        setUser(res.data.data.user);
        setFormData({
          firstName: res.data.data.user.firstName || '',
          lastName: res.data.data.user.lastName || '',
          email: res.data.data.user.email || '',
          phone: res.data.data.user.phone || '',
        });
        setProfileImage(res.data.data.user.photo)
        
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch user data');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      // Store the file object for FormData submission
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleSubmitPersonal = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Clear previous errors
    try {
      const data = new FormData(e.target);

      if (formData.photo) {
        data.append('photo', formData.photo);
      }
      const res = await axios.patch('api/v1/users/updateMe', data);
      if (res.data.status === 'success') {
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        toast.success('Profile updated successfully');
        setUser(res.data.data.user);
        setEditMode(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
      // Extract errors from the backend response
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        // For unexpected errors, set a generic error
        setErrors({ general: 'An unexpected error occurred' });
        console.log('Unexpected Error:', err);
      }
      toast.error(err.response?.data?.message || 'Error creating account');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while fetching user data
  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
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
                  name='photo'
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
              {errors.general && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {errors.general}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                />
              </div>
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Saving..."
                className="mt-4 font-medium py-2 px-6 rounded-lg"
              >
                Save Changes
              </Button>
            </form>
          ) : (
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                <p className="text-gray-800 dark:text-white font-medium">{user.email}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="text-gray-800 dark:text-white font-medium">{user.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;