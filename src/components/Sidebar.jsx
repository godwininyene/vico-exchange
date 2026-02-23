import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import {
  FiHome, FiShoppingCart, FiDollarSign, FiTrendingUp,
  FiSettings, FiUsers, FiCreditCard, FiDatabase,
  FiLogOut, FiX, FiChevronDown, FiPhoneCall, FiWifi, FiTv
} from "react-icons/fi";
import { RiExchangeFill } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { useState, useEffect } from "react";
import logo from './../assets/images/logo.png';
import { FaUser, FaWallet } from "react-icons/fa";
import { logout } from "../utils/logout";
import { useSettings } from "../hooks/useSettings";

const Sidebar = ({ user, isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [transactionsOpen, setTransactionsOpen] = useState(false);
  const [adminTransactionsOpen, setAdminTransactionsOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { generalData } = useSettings();

  // Close sidebar when route changes (for mobile)
  // useEffect(() => {
  //   onClose();
  // }, [location.pathname, onClose]);

  const handleLogout = async () => {
    setProcessing(true);
    try {
      await logout(navigate);
    } catch (err) {
      console.log(err);
    } finally {
      setProcessing(false);
    }
  };

  // Check if any transaction sub-item is active (for user)
  const isUserTransactionActive = () => {
    const transactionPaths = [
      '/user/vtu-transactions',
      '/user/trading-transactions'
    ];
    return transactionPaths.some(path => location.pathname === path);
  };

  // Check if any transaction sub-item is active (for admin)
  const isAdminTransactionActive = () => {
    const transactionPaths = [
      '/admin/vtu-transactions',
      '/admin/trading-transactions'
    ];
    return transactionPaths.some(path => location.pathname === path);
  };

  const user_links = [
    { name: "Dashboard", path: "/user/dashboard", icon: <FiHome size={18} /> },

    // VTU Services
    { name: "Buy Data", path: "/user/buy-data", icon: <FiWifi size={18} /> },
    { name: "Buy Airtime", path: "/user/buy-airtime", icon: <FiPhoneCall size={18} /> },
    { name: "Cable Subscription", path: "/user/buy-cable-tv", icon: <FiTv size={18} /> },

    // Trading
    { name: "Buy Gift Cards", path: "/user/buy-giftcard", icon: <FiShoppingCart size={18} /> },
    { name: "Sell Gift Cards", path: "/user/sell-giftcard", icon: <FiDollarSign size={18} /> },
    { name: "Buy Crypto", path: "/user/buy-crypto", icon: <FiTrendingUp size={18} /> },
    { name: "Sell Crypto", path: "/user/sell-crypto", icon: <RiExchangeFill size={18} /> },

    // Transactions Dropdown
    {
      name: "Transactions",
      icon: <FiCreditCard size={18} />,
      type: "dropdown",
      children: [
        { name: "VTU Transactions", path: "/user/vtu-transactions", icon: <FiWifi size={18} /> },
        { name: "Trading Transactions", path: "/user/transactions", icon: <FiShoppingCart size={18} /> }
      ]
    },

    // Profile
    { name: "Profile", path: "/user/profile", icon: <FaUser size={18} /> }
  ];

  const admin_links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome size={18} /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers size={18} /> },
    
    // Admin Transactions Dropdown
    {
      name: "Transactions",
      icon: <FiCreditCard size={18} />,
      type: "dropdown",
      children: [
        { name: "VTU Transactions", path: "/admin/vtu-transactions", icon: <FiWifi size={18} /> },
        { name: "Trading Transactions", path: "/admin/transactions", icon: <FiShoppingCart size={18} /> }
      ]
    },
    
    { name: "Gift Cards", path: "/admin/giftcards", icon: <FiDatabase size={18} /> },
    { name: "Coins", path: "/admin/coins", icon: <BsCoin size={18} /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings size={18} /> },
  ];

  // Render links with dropdown support
  const renderLinks = (links) => {
    return links.map((link) => {
      // If it's a dropdown
      if (link.type === "dropdown") {
        const isActive = user?.role === "admin" 
          ? isAdminTransactionActive()
          : isUserTransactionActive();
        const isOpen = user?.role === "admin" ? adminTransactionsOpen : transactionsOpen;
        const setIsOpen = user?.role === "admin" ? setAdminTransactionsOpen : setTransactionsOpen;

        return (
          <div key={link.name} className="space-y-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                w-full cursor-pointer flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive
                  ? 'bg-primary-dark/10 text-primary-dark dark:bg-gray-700 dark:text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              <div className="flex items-center">
                <span className="mr-3">{link.icon}</span>
                <span>{link.name}</span>
              </div>
              <FiChevronDown 
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                size={18}
              />
            </button>
            
            {/* Dropdown Content */}
            {isOpen && (
              <div className="ml-4 space-y-1 mt-1">
                {link.children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    className={({ isActive }) => `
                      flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ml-2
                      ${isActive
                        ? 'bg-primary-dark/10 text-primary-dark dark:bg-gray-700 dark:text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                      }
                    `}
                    onClick={onClose}
                  >
                    <span className="mr-3">{child.icon}</span>
                    <span className="text-sm">{child.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      }
      
      // Regular link
      return (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => `
            flex items-center px-4 py-3 rounded-lg transition-colors duration-200
            ${isActive
              ? 'bg-primary-dark/10 text-primary-dark dark:bg-gray-700 dark:text-white font-medium'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }
          `}
          onClick={onClose}
        >
          <span className="mr-3">{link.icon}</span>
          <span>{link.name}</span>
        </NavLink>
      );
    });
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4">
          <Link className="flex items-center" to="/">
            <img src={logo} alt="Logo" className="h-8" />
            <h1 className="font-bold ml-2 text-lg text-gray-600 dark:text-gray-300">
              {generalData.platformName}
            </h1>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-11rem)]">
          {renderLinks(user?.role === "admin" ? admin_links : user_links)}
        </nav>

        {/* Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="relative">
            <button
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.photo || 'https://via.placeholder.com/150'}
                  alt={user?.firstName}
                />
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-white">
                    {user?.firstName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                  </p>
                </div>
              </div>
              <FiChevronDown className={`transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={handleLogout}
                  disabled={processing}
                  className="disabled:opacity-70 w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {processing ? <LoadingIndicator size={5} /> : <>
                    <FiLogOut className="mr-3" /> Logout
                  </>}
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;