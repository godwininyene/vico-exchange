import Hero from "../components/Hero";
import steps_img from './../assets/images/steps_image.jpg';
import { FaUserPlus, FaExchangeAlt, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { FaShieldAlt, FaTachometerAlt, FaPercent, FaHeadset } from 'react-icons/fa';

import SectionTestimonial from "../components/SectionTestimonial";


const Home = () => {
  return (
    <div className="">
      <Hero />

      {/* Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple & Secure Trading Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures fast, secure transactions every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-14 h-14 bg-primary-dark rounded-full flex items-center justify-center text-white text-xl mb-6">
                <FaUserPlus size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Create Your Account</h3>
              <p className="text-gray-600">
                Click the Trade Online button to register and complete your profile in minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-14 h-14 bg-primary-dark rounded-full flex items-center justify-center text-white text-xl mb-6">
                <FaExchangeAlt size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Initiate Your Trade</h3>
              <p className="text-gray-600">
                Request to sell or buy - we currently accept Gift Cards and Cryptocurrencies.
              </p>
            </div>

            {/* Image in the middle on desktop */}
            <div className="hidden lg:flex items-center justify-center col-span-2 row-span-2 row-start-1 col-start-2">
              <img 
                src={steps_img} 
                alt="Trading process illustration" 
                className="w-full h-auto max-w-md rounded-lg shadow-lg"
                data-aos="zoom-in"
                data-aos-delay="300"
              />
            </div>

            {/* Step 3 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-14 h-14 bg-primary-dark rounded-full flex items-center justify-center text-white text-xl mb-6">
                <FaCheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Verification Process</h3>
              <p className="text-gray-600">
                Our team quickly verifies your submitted assets for authenticity.
              </p>
            </div>

            {/* Step 4 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="w-14 h-14 bg-primary-dark rounded-full flex items-center justify-center text-white text-xl mb-6">
                <FaWallet size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Instant Crediting</h3>
              <p className="text-gray-600">
                Once approved, your wallet is credited immediately.
              </p>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="mt-12 lg:hidden">
            <img 
              src={steps_img} 
              alt="Trading process illustration" 
              className="w-full h-auto rounded-lg shadow-lg"
              data-aos="fade-up"
            />
          </div>
        </div>
      </section>


      {/* Why Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Vico Exchange?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're redefining digital asset exchange with unmatched benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div 
              className="p-8 rounded-xl border border-gray-100 hover:border-primary-dark transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-14 h-14 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-xl mb-6">
                <FaShieldAlt size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Bank-Level Security</h3>
              <p className="text-gray-600">
                Military-grade encryption protects all your transactions and personal data.
              </p>
            </div>

            {/* Feature 2 */}
            <div 
              className="p-8 rounded-xl border border-gray-100 hover:border-primary-dark transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-14 h-14 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-xl mb-6">
                <FaTachometerAlt size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600">
                95% of transactions completed in under 15 minutes from verification.
              </p>
            </div>

            {/* Feature 3 */}
            <div 
              className="p-8 rounded-xl border border-gray-100 hover:border-primary-dark transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-14 h-14 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-xl mb-6">
                <FaPercent size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Best Rates</h3>
              <p className="text-gray-600">
                We offer the most competitive rates in the market, guaranteed.
              </p>
            </div>

            {/* Feature 4 */}
            <div 
              className="p-8 rounded-xl border border-gray-100 hover:border-primary-dark transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-14 h-14 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-xl mb-6">
                <FaHeadset size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">
                Real human support available round the clock via chat, email, and phone.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-dark mb-2">10,000+</div>
              <div className="text-gray-600">Happy Traders</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-dark mb-2">$50M+</div>
              <div className="text-gray-600">In Transactions</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-dark mb-2">99.8%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-dark mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <SectionTestimonial />
    
    </div>
  );
};

export default Home;