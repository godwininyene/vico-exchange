import Hero from "../components/Hero";
import steps_img from './../assets/images/steps_image.jpg';
import { FaUserPlus, FaExchangeAlt, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { FaShieldAlt, FaTachometerAlt, FaPercent, FaHeadset } from 'react-icons/fa';
import mtn from "../assets/images/mtn.png";
import airtel from "../assets/images/airtel.png";
import glo from "../assets/images/glo.png";
import nineMobile from "../assets/images/9mobile.jpg";
import SectionTestimonial from "../components/SectionTestimonial";
import { useState } from "react";

import providers from './../assets/images/providers.png'

const cableProviders = [
  { name: 'DSTV', plans: ['Premium', 'Compact+', 'Compact', 'Yanga'] },
  { name: 'GOTV', plans: ['Max', 'Jolli', 'Jinja', 'Smallie'] },
  { name: 'Startimes', plans: ['Nova', 'Basic', 'Smart', 'Super'] },
];

const vtuPlans = {
  MTN: [
    { name: "500MB", price: 300, validity: "30 Days" },
    { name: "1GB", price: 500, validity: "30 Days" },
    { name: "2GB", price: 1000, validity: "30 Days" },
    { name: "2GB", price: 1000, validity: "30 Days" },
  ],
  Airtel: [
    { name: "500MB", price: 300, validity: "14 Days" },
    { name: "1GB", price: 500, validity: "30 Days" },
    { name: "2GB", price: 1000, validity: "30 Days" },
  ],
  Glo: [
    { name: "1GB", price: 450, validity: "7 Days" },
    { name: "2.5GB", price: 1000, validity: "30 Days" },
    { name: "5GB", price: 2000, validity: "30 Days" },
  ],
  "9mobile": [
    { name: "500MB", price: 300, validity: "7 Days" },
    { name: "1GB", price: 500, validity: "30 Days" },
    { name: "2GB", price: 1000, validity: "30 Days" },
  ],


};

const networks = [
  { id: 'mtn', name: 'MTN', color: '#FFC107' },
  { id: 'glo', name: 'Glo', color: '#28A745' },
  { id: 'airtel', name: 'Airtel', color: '#E91E63' },
  { id: 'etisalat', name: '9mobile', color: '#673AB7' },
];





const Home = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('mtn');
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


      {/* Our Services - VTU Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trade digital assets and recharge instantly — all in one powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Crypto */}
            <div className="p-8 rounded-xl border border-gray-100 hover:border-primary-dark transition-all duration-300" data-aos="fade-up">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Cryptocurrency Exchange</h3>
              <p className="text-gray-600">
                Buy and sell popular cryptocurrencies at the best market rates with fast settlement.
              </p>
            </div>

            {/* Gift Cards */}
            <div className="p-8 rounded-xl border border-gray-100 hover:border-primary-dark transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Gift Card Trading</h3>
              <p className="text-gray-600">
                Exchange your gift cards securely and get credited instantly to your wallet.
              </p>
            </div>

            {/* VTU */}
            <div className="p-8 rounded-xl border border-gray-100 hover:border-primary-dark transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">VTU – Airtime & Data</h3>
              <p className="text-gray-600">
                Top up airtime and data for all major networks in seconds, anytime, anywhere.
              </p>

              {/* Network Logos */}
              <div className="flex items-center gap-4 mt-6">
                <img src={mtn} alt="MTN" className="h-8 object-contain" />
                <img src={airtel} alt="Airtel" className="h-8 object-contain" />
                <img src={glo} alt="Glo" className="h-8 object-contain" />
                <img src={nineMobile} alt="9mobile" className="h-8 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VTU Plans Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Airtime & Data Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a network and instantly recharge your line with affordable data plans
            </p>
          </div>

          {/* Network Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {networks.map((network) => (
              <button
                key={network.id}
                className={`network-btn ${selectedNetwork === network.id ? 'active' : ''}`}
                onClick={() => setSelectedNetwork(network.id)}
                style={{ backgroundColor: network.color }}
              >
                {network.name}
              </button>
            ))}
          </div>

          {/* Plans Grid (MTN default for now) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {vtuPlans.MTN.map((plan, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {plan.name} Data
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Valid for {plan.validity}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-dark">
                    ₦{plan.price}
                  </span>
                  <button className="px-4 py-2 bg-primary-dark text-white text-sm rounded-lg hover:opacity-90 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Cable TV Section */}
      <section className="max-w-7xl mx-auto my-12 px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Cable TV Subscription
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cableProviders.map((provider, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{provider.name}</h3>
                <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                  View All Plans
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {provider.plans.map((plan, pIndex) => (
                  <div
                    key={pIndex}
                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700 font-medium">{plan}</span>
                    <button className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

      {/* Why Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              some reason write up here
            </p>
          </div>

          <img src={providers} />
        </div>
      </section>

    </div>
  );
};

export default Home;