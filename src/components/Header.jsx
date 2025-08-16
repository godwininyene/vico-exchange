import { FiMenu, FiBell, FiSearch, FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/logout';
import LoadingIndicator from './LoadingIndicator';

const Header = ({ user, onMenuToggle }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const[processing, setProcessing] = useState(false)

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    const initialDarkMode = savedTheme 
      ? savedTheme === 'dark'
      : systemPrefersDark;
    
    setDarkMode(initialDarkMode);
    
    // Apply the class to HTML element
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);

    
  }, []);


 const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Update localStorage
    if (newDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  
 
  const handleLogout = async () => {
    setProcessing(true);
    try {
      const res = await logout(navigate);
        setProcessing(false);
    }catch (err) {
        setProcessing(false);
      console.log(err);
    }
   };

  return (
    <header className={`fixed top-0 right-0 z-30 ${isMobile ? 'left-0' : 'left-64'} bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section - Mobile menu button and search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
          >
            <FiMenu size={24} />
          </button>

          <div className={`${searchOpen ? 'block' : 'hidden'} md:block relative`}>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-primary-dark focus:outline-none transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Right section - User controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <FiSearch size={20} />
          </button>

          <button
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full focus:outline-none"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full focus:outline-none">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User profile dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                {user?.photo ? (
                  <img src={user.photo} alt={user.firstName} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <FiUser className="text-gray-600 dark:text-gray-300" />
                )}
              </div>
              {!isMobile && (
                <span className="text-sm font-medium text-gray-700 dark:text-white">
                  {user?.firstName || 'User'}
                </span>
              )}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-40">
                <button
                  onClick={handleLogout}
                  disabled={processing}
                  className="cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    {processing ? (
                        <LoadingIndicator size={5} />
                      ) : (
                        <>
                          <FiLogOut className="mr-3" />
                          <span>Logout</span>
                        </>
                    )}
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {profileOpen && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => setProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;