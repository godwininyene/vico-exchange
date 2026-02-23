import SectionCTA from '../components/SectionCTA';
import servicesHero from './../assets/images/about-03.jpg';
import { 
  FaExchangeAlt, 
  FaMoneyBillWave, 
  FaShieldAlt, 
  FaChartLine, 
  FaHeadset, 
  FaCoins,
  FaMobileAlt,
  FaTv
} from 'react-icons/fa';

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
            Our Digital Services
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Trade crypto, sell gift cards, buy airtime & data, and pay bills — all in one platform
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              What You Can Do on Vico Exchange
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              A complete fintech platform for trading and everyday digital payments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gift Card Exchange */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up">
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaExchangeAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Gift Card Exchange</h3>
              <p className="text-gray-600 mb-4">
                Sell local and international gift cards at competitive rates with fast payouts.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Amazon, iTunes, Steam & more</li>
                <li>✓ Instant rate calculation</li>
                <li>✓ No hidden charges</li>
              </ul>
            </div>

            {/* Crypto Trading */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaCoins />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Cryptocurrency Trading</h3>
              <p className="text-gray-600 mb-4">
                Buy and sell popular cryptocurrencies with real-time market rates.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ BTC, ETH, USDT & more</li>
                <li>✓ Fast confirmations</li>
                <li>✓ Low transaction fees</li>
              </ul>
            </div>

            {/* VTU */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaMobileAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">VTU (Airtime & Data)</h3>
              <p className="text-gray-600 mb-4">
                Instantly buy airtime and mobile data for all major networks.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ MTN, Airtel, Glo & 9mobile</li>
                <li>✓ Instant delivery</li>
                <li>✓ Affordable data plans</li>
              </ul>
            </div>

            {/* Cable TV */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up">
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaTv />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Cable TV Subscriptions</h3>
              <p className="text-gray-600 mb-4">
                Pay for your cable TV subscriptions and entertainment services easily.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ DSTV, GOTV & more</li>
                <li>✓ Instant activation</li>
                <li>✓ No queues, no stress</li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">24/7 Customer Support</h3>
              <p className="text-gray-600 mb-4">
                Our support team is always available to help you resolve any issues.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Live chat support</li>
                <li>✓ Email & WhatsApp support</li>
                <li>✓ Helpful guides</li>
              </ul>
            </div>

            {/* Security */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center text-white text-2xl mb-6">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Transactions</h3>
              <p className="text-gray-600 mb-4">
                Your transactions and personal data are protected with industry-standard security practices.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Encrypted transactions</li>
                <li>✓ Secure wallets</li>
                <li>✓ Continuous monitoring</li>
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
