import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { 
  FiHome, FiShoppingCart, FiDollarSign, FiTrendingUp, 
  FiSettings, FiUsers, FiCreditCard, FiDatabase,
  FiLogOut, FiX, FiChevronDown
} from "react-icons/fi";
import { RiExchangeFill } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { useState } from "react";
import logo from './../assets/images/logo.png';
import { FaUser } from "react-icons/fa";
import { logout } from "../utils/logout";

const Sidebar = ({ user, isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const[processing, setProcessing] = useState(false)

  const handleLogout = async () => {
    setProcessing(true);
    try {
        const res = await logout(navigate);
        setProcessing(false);
      } catch (err) {
        setProcessing(false);
        console.log(err);
    }
  };

  const user_links = [
    { name: "Dashboard", path: "/user/dashboard", icon: <FiHome size={18} /> },
    { name: "Buy Giftcard", path: "/user/buy-giftcard", icon: <FiShoppingCart size={18} /> },
    { name: "Sell Giftcard", path: "/user/sell-giftcard", icon: <FiDollarSign size={18} /> },
    { name: "Buy Crypto", path: "/user/buy-crypto", icon: <FiTrendingUp size={18} /> },
    { name: "Sell Crypto", path: "/user/sell-crypto", icon: <RiExchangeFill size={18} /> },
    { name: "Transactions", path: "/user/transactions", icon: <FiCreditCard size={18} /> },
    {name:"Profile", path:"/user/profile" , icon: <FaUser size={18} />}
  ];

  const admin_links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome size={18} /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers size={18} /> },
    { name: "Transactions", path: "/admin/transactions", icon: <FiCreditCard size={18} /> },
    { name: "Giftcards", path: "/admin/giftcards", icon: <FiDatabase size={18} /> },
    { name: "Coins", path: "/admin/coins", icon: <BsCoin size={18} /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings size={18} /> },
  ];

  const links = user?.role === "admin" ? admin_links : user_links;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4">
          <div className="flex">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-8" 
                />
                <h1 className="font-bold ml-2 text-lg text-gray-500 l dark:text-gray-400">Vico Exchange</h1>
            </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 l dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-11rem)]">
          {links.map((link) => (
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
              <span className="mr-3">
                {link.icon}
              </span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile with Dropdown */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="relative">
            <button 
              className="cursor-pointer w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.photo || 'https://via.placeholder.com/150'}
                    alt={user.firstName}
                  />
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-white">
                    {user?.firstName || 'User Name'}
                  </p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                  </p>
                </div>
              </div>
              <FiChevronDown className={`text-gray-500 transition-transform ${profileOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={handleLogout}
                  disabled={processing}
                  className="cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed  w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {processing ? (
                      <LoadingIndicator size={5} />
                    ) : (
                      <>
                        <FiLogOut className="mr-3" />
                        <span>Logout</span>
                      </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
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