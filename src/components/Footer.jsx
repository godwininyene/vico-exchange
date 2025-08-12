import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from './../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About section */}
          <div className="mb-8">
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="Company Logo" className="h-10" />
              <h1 className="font-bold">Vico Exchange</h1>
            </Link>
            <p className="text-gray-400 mb-6">
              Welcome to Vico Exchange – Buy and sell gift cards and cryptocurrency with ease. Fast,
              secure transactions and great rates. Start trading today
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-dark transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-dark transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-dark transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Main Links */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-dark transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-dark transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary-dark transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-dark transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-white">Our Services</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-dark transition-colors">
                  Crypto Currency Exchange
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-dark transition-colors">
                  Gift Card Exchange
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-white">Contact Us</h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Trade Street, Digital City, 100001</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>support@vicoexchange.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕒</span>
                <span>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Vico Exchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;