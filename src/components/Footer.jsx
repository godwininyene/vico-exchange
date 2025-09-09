import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok
} from 'react-icons/fa';
import logo from './../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

const Footer = () => {
  const { generalData } = useSettings();

  return (
    <footer className="bg-[#020617] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About section */}
          <div className="mb-8">
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="Company Logo" className="h-10" />
              <h1 className="font-bold">{generalData.platformName}</h1>
            </Link>
            <p className="text-gray-400 mb-6">
              Welcome to {generalData.platformName} – Buy and sell gift cards and cryptocurrency with ease. Fast,
              secure transactions and great rates. Start trading today.
            </p>
            <div className="flex space-x-4">
              {generalData.socialLinks.twitter && (
                <a
                  href={generalData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-dark transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {generalData.socialLinks.facebook && (
                <a
                  href={generalData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-dark transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
              )}
              {generalData.socialLinks.instagram && (
                <a
                  href={generalData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-dark transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {generalData.socialLinks.linkedin && (
                <a
                  href={generalData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-dark transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {generalData.socialLinks.youtube && (
                <a
                  href={generalData.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-dark transition-colors"
                >
                  <FaYoutube size={20} />
                </a>
              )}
              {generalData.socialLinks.tiktok && (
                <a
                  href={generalData.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-dark transition-colors"
                >
                  <FaTiktok size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Main Links */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-dark">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-dark">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary-dark">Services</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-dark">Contact</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-white">Our Services</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-dark">Crypto Currency Exchange</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-dark">Gift Card Exchange</Link></li>
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
                <span>{generalData.supportPhone}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>{generalData.supportEmail}</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕒</span> <span>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {generalData.platformName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
