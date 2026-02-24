import { FaHandshake, FaChartLine, FaShieldAlt, FaUsers, FaMobileAlt, FaGift, FaBitcoin, FaTv } from 'react-icons/fa';
import aboutHero from './../assets/images/about-bg.jpg';
import about01 from './../assets/images/about-01.jpg';
import SectionTestimonial from '../components/SectionTestimonial';
import SectionCTA from '../components/SectionCTA';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black/50 z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${aboutHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            data-aos="fade-up"
          >
            About Winsubz
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            A secure digital services platform for crypto trading, gift cards, airtime, data & bill payments
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Winsubz is a modern fintech platform built to simplify digital transactions. 
                We started by helping users exchange gift cards and cryptocurrencies quickly and securely, 
                and we’ve grown into a complete digital services platform.
              </p>
              <p className="text-gray-600 mb-4">
                Today, our users can trade crypto, sell gift cards, buy airtime and mobile data, 
                and pay cable TV bills — all from one simple dashboard. Our goal is to make digital finance 
                accessible, fast, and reliable for everyday users.
              </p>
              <p className="text-gray-600">
                With secure payments, competitive rates, and responsive customer support, 
                we’re building a trusted platform for seamless digital transactions.
              </p>
            </div>
            <div 
              className="rounded-xl overflow-hidden shadow-lg"
              data-aos="fade-left"
            >
              <img 
                src={about01} 
                alt="Vico Exchange team building digital finance solutions" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              What We Offer
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Everything you need for fast, secure digital transactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-gray-50 rounded-lg text-center" data-aos="fade-up">
              <FaBitcoin className="text-3xl text-primary-dark mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Crypto Exchange</h3>
              <p className="text-gray-600">Trade popular cryptocurrencies at competitive rates with fast payouts.</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-lg text-center" data-aos="fade-up" data-aos-delay="100">
              <FaGift className="text-3xl text-primary-dark mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Gift Card Trading</h3>
              <p className="text-gray-600">Sell local and international gift cards securely and receive instant value.</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-lg text-center" data-aos="fade-up" data-aos-delay="200">
              <FaMobileAlt className="text-3xl text-primary-dark mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">VTU (Airtime & Data)</h3>
              <p className="text-gray-600">Buy airtime and mobile data instantly for all major networks.</p>
            </div>

            <div className="p-8 bg-gray-50 rounded-lg text-center" data-aos="fade-up" data-aos-delay="300">
              <FaTv className="text-3xl text-primary-dark mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Cable TV Bills</h3>
              <p className="text-gray-600">Pay for cable TV subscriptions and utilities without stress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              The principles that guide our fintech platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white rounded-lg text-center shadow-sm" data-aos="fade-up">
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Trust</h3>
              <p className="text-gray-600">
                Transparent processes and reliable payouts you can depend on.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg text-center shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our platform for a better user experience.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg text-center shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Security</h3>
              <p className="text-gray-600">
                Protecting user data and transactions with industry-standard security practices.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg text-center shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600">
                Supporting our users with fast responses, education, and real human support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SectionTestimonial />

      {/* CTA */}
      <SectionCTA />
    </div>
  );
};

export default About;
