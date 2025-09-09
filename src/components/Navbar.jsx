import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from './../assets/images/logo.png';
import { useSettings } from "../hooks/useSettings";
import axios from "../lib/axios";
import { toast } from "react-toastify";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const { generalData } = useSettings();

  const userDashboardLink = '/user/dashboard';
  const adminDashboardLink = '/admin/dashboard';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fetch user on mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('api/v1/users/me');
        if (res.data.status === 'success') {
          setUser(res.data.data.user);
        }
      } catch (err) {
        // don't toast on every page load if not logged in
        // if (err.response?.status !== 401) {
        //   toast.error(err.response?.data?.message || 'Failed to fetch user data');
        // }
      }
    };

    getUser();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dashboardLink =
    user?.role === "admin" ? adminDashboardLink : userDashboardLink;

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      <nav
        className={`fixed w-full bg-white shadow-md z-50 transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Company Logo"
                className="h-8 transition-all duration-300"
              />
              <h1 className="font-bold ml-2 text-lg">
                {generalData.platformName}
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`${
                      location.pathname === link.path
                        ? "text-primary-dark font-semibold border-b-2 border-primary-dark"
                        : "text-gray-700 hover:text-primary-dark"
                    } px-1 py-2 font-medium transition-colors duration-300`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Auth / Dashboard */}
              <div className="flex items-center space-x-4 ml-6">
                {user ? (
                  <Link
                    to={dashboardLink}
                    className="px-4 py-2 bg-primary-dark text-white font-medium rounded-md hover:bg-primary-light transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-primary-dark font-medium hover:text-primary-light transition-colors duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-primary-dark text-white font-medium rounded-md hover:bg-primary-light transition-colors duration-300"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-gray-700 hover:text-primary-dark focus:outline-none transition-colors duration-300"
                aria-label="Toggle menu"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="h-6 w-6 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`${
                    location.pathname === link.path
                      ? "bg-primary-dark/10 text-primary-dark"
                      : "text-gray-700 hover:bg-gray-50"
                  } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <Link
                    to={dashboardLink}
                    onClick={toggleMobileMenu}
                    className="block px-3 py-2 mt-1 bg-primary-dark text-white rounded-md text-base font-medium hover:bg-primary-light transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={toggleMobileMenu}
                      className="block px-3 py-2 mt-1 bg-primary-dark text-white rounded-md text-base font-medium hover:bg-primary-light transition-colors duration-200"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
