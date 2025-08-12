import InputField from '../components/InputField';
import contactHero from './../assets/images/contact-bg.jpg';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black/50 z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${contactHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            data-aos="fade-up"
          >
            Contact Us
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" data-aos="fade-up">
                Get In Touch
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div data-aos="fade-up" data-aos-delay="100">
                    <InputField
                      label='Your name'
                      placeholder="Your name here"
                    />
                  </div>
                  <div data-aos="fade-up" data-aos-delay="150">
                    <InputField
                      label='Your email'
                      placeholder="Your email here"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div data-aos="fade-up" data-aos-delay="200">
                    <InputField
                      label='Subject'
                      placeholder="Your subject here"
                    />
                  </div>
                  <div data-aos="fade-up" data-aos-delay="250">
                    <InputField
                      label='Phone'
                      placeholder="Your phone here"
                    />
                  </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="300">
                  <InputField
                    label='Message'
                    placeholder="Tell us a few words"
                    as='textarea'
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8" data-aos="fade-left">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>
                <p className="text-gray-600 mb-8">
                  We offer the excessive speed, secure, and dependable net connection that helps you to do what you like online.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-dark/10 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-primary-dark text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Offices</h3>
                    <p className="text-gray-600">47 Wood Circle, London - UK</p>
                    <p className="text-gray-600 mt-2">29 Queens Street, Boston-00387</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-dark/10 p-3 rounded-full mr-4">
                    <FaPhoneAlt className="text-primary-dark text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600">(+44) 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-dark/10 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-primary-dark text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">support@vicoexchange.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us On Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 hover:bg-primary-dark hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                    <FaFacebook className="text-gray-700 hover:text-white" />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-primary-dark hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                    <FaTwitter className="text-gray-700 hover:text-white" />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-primary-dark hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                    <FaInstagram className="text-gray-700 hover:text-white" />
                  </a>
                  <a href="#" className="bg-gray-100 hover:bg-primary-dark hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                    <FaLinkedin className="text-gray-700 hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;