import { FaHandshake, FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';
import aboutHero from './../assets/images/about-bg.jpg';
import about01 from './../assets/images/about-01.jpg'
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
            About Vico Exchange
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Pioneering secure digital asset exchange
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
                At Vico Exchange, we specialize in providing a simple, secure,
                and efficient platform for buying and selling gift cards and cryptocurrency.
                Whether you're looking to exchange your gift cards for cash or invest in digital currencies,
                we offer fast transactions, competitive rates, and a seamless experience for all our users.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to make digital trading easy, accessible, and safe for everyone.
                With top-notch security, instant payouts, and a customer-first approach,
                we strive to provide the best service in the market. Join us today and experience
                the future of trading.
              </p>
              {/* <p className="text-gray-600">
                Today, we're proud to offer instant, secure transactions with industry-leading rates and customer support.
              </p> */}
            </div>
            <div 
              className="rounded-xl overflow-hidden shadow-lg"
              data-aos="fade-left"
            >
              <img 
                src={about01} 
                alt="Vico Exchange team working together" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Our Core Values
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              className="p-8 bg-gray-50 rounded-lg text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Trust</h3>
              <p className="text-gray-600">
                Building relationships through transparency and reliability in every transaction
              </p>
            </div>

            <div 
              className="p-8 bg-gray-50 rounded-lg text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Innovation</h3>
              <p className="text-gray-600">
                Constantly improving our platform to deliver cutting-edge solutions
              </p>
            </div>

            <div 
              className="p-8 bg-gray-50 rounded-lg text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Security</h3>
              <p className="text-gray-600">
                Protecting our customers with military-grade encryption and protocols
              </p>
            </div>

            <div 
              className="p-8 bg-gray-50 rounded-lg text-center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center text-primary-dark text-2xl mb-6 mx-auto">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600">
                Empowering our users through education and exceptional support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <SectionTestimonial />

      {/* CTA Section */}
      <SectionCTA />
    </div>
  );
};

export default About;