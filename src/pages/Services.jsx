import SectionCTA from '../components/SectionCTA';
import servicesHero from './../assets/images/about-03.jpg';
import { FaExchangeAlt, FaMoneyBillWave, FaShieldAlt, FaChartLine, FaHeadset, FaCoins } from 'react-icons/fa';

const Services = () => {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black/50 z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${servicesHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            data-aos="fade-up"
          >
            Our Trading Solutions
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Secure, fast, and reliable digital asset exchange services
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              Digital Asset Exchange Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              We provide comprehensive solutions for all your digital trading needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaExchangeAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Gift Card Exchange</h3>
              <p className="text-gray-600 mb-4">
                Easily buy and sell gift cards from top brands at competitive rates. Fast and secure transactions guaranteed.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Amazon, iTunes, Steam, and more</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Instant rate calculations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>No hidden fees</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaCoins />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Cryptocurrency Trading</h3>
              <p className="text-gray-600 mb-4">
                Trade popular cryptocurrencies with ease. Buy, sell, or exchange crypto quickly and securely.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>BTC, ETH, USDT, and more</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Real-time market rates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Low transaction fees</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaMoneyBillWave />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Instant Payouts</h3>
              <p className="text-gray-600 mb-4">
                Get instant payouts for your gift cards or crypto transactions. No delays, just quick and reliable payments.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Multiple payout options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Bank transfer, mobile money, crypto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>24/7 processing</span>
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Competitive Rates</h3>
              <p className="text-gray-600 mb-4">
                Enjoy the best rates in the market for both gift cards and cryptocurrency. Maximize your value every time you trade.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Rate comparison tool</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Bulk trade discounts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Loyalty rewards</span>
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600 mb-4">
                Our dedicated support team is available around the clock to assist you with any questions or issues.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Live chat support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Email and phone support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Detailed FAQs and guides</span>
                </li>
              </ul>
            </div>

            {/* Service 6 */}
            <div 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Transactions</h3>
              <p className="text-gray-600 mb-4">
                Your security is our priority. All transactions are protected with top-tier encryption and security protocols.
              </p>
              <ul className="space-y-2 text-gray-600">
                {/* <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>2FA authentication</span>
                </li> */}
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Cold storage for crypto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-dark mr-2">✓</span>
                  <span>Regular security audits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SectionCTA />
    </div>
  );
};

export default Services;