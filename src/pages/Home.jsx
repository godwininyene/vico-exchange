import Hero from "../components/Hero";
import { FaUserPlus, FaWallet, FaBolt } from "react-icons/fa";
import { FaShieldAlt, FaTachometerAlt, FaPercent, FaHeadset } from "react-icons/fa";
import mtn from "../assets/images/mtn.png";
import airtel from "../assets/images/airtel.png";
import glo from "../assets/images/glo.png";
import nineMobile from "../assets/images/9mobile.jpg";
import SectionTestimonial from "../components/SectionTestimonial";
import { useState } from "react";
import providers from './../assets/images/providers.png'
import { useNavigate } from "react-router-dom";

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
  { id: 'MTN', name: 'MTN', color: '#FFC107' },
  { id: 'Glo', name: 'Glo', color: '#28A745' },
  { id: 'Airtel', name: 'Airtel', color: '#E91E63' },
  { id: '9mobile', name: '9mobile', color: '#673AB7' },
];

const Home = () => {

  const [selectedNetwork, setSelectedNetwork] = useState('MTN');
  const navigate = useNavigate()

  return (
    <div>

      <Hero />

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Winsubz Works
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Buy cheap data, recharge airtime and pay electricity bills in Nigeria instantly
              using our fast and secure VTU platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <FaUserPlus className="text-primary-dark mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up on Winsubz and start using our VTU platform to buy cheap data and airtime instantly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <FaWallet className="text-primary-dark mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Fund Your Wallet</h3>
              <p className="text-gray-600">
                Add funds to your wallet securely and get ready to purchase airtime, data or pay bills.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <FaBolt className="text-primary-dark mb-4" size={28} />
              <h3 className="text-xl font-semibold mb-3">Buy Data or Pay Bills</h3>
              <p className="text-gray-600">
                Instantly buy MTN, Airtel, Glo or 9mobile data, pay electricity bills or subscribe to cable TV.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* OUR SERVICES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              VTU & Bill Payment Services
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Winsubz makes it easy to buy cheap data, recharge airtime and pay utility bills in Nigeria instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-8 border rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Airtime Recharge</h3>
              <p className="text-gray-600">
                Instantly recharge MTN, Airtel, Glo and 9mobile airtime anytime.
              </p>
            </div>

            <div className="p-8 border rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Cheap Data Plans</h3>
              <p className="text-gray-600">
                Purchase affordable MTN, Airtel, Glo and 9mobile data bundles.
              </p>

              <div className="flex items-center gap-4 mt-6">
                <img src={mtn} alt="MTN Data Nigeria" className="h-8" />
                <img src={airtel} alt="Airtel Data Nigeria" className="h-8" />
                <img src={glo} alt="Glo Data Nigeria" className="h-8" />
                <img src={nineMobile} alt="9mobile Data Nigeria" className="h-8" />
              </div>

            </div>

            <div className="p-8 border rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Electricity Bills</h3>
              <p className="text-gray-600">
                Generate prepaid electricity tokens and pay your electricity bills instantly.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* DATA PLANS */}
      <section className="py-20 bg-gray-50">

        <div className="container mx-auto px-4">

          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cheap Data Plans in Nigeria
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Buy cheap MTN, Airtel, Glo and 9mobile data instantly on Winsubz.
            </p>

          </div>

          <div className="flex justify-center gap-4 mb-10 flex-wrap">

            {networks.map(network => (
              <button
                key={network.id}
                onClick={() => setSelectedNetwork(network.id)}
                className="px-6 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: network.color }}
              >
                {network.name}
              </button>
            ))}

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {vtuPlans[selectedNetwork].map((plan, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">

                <h3 className="text-lg font-semibold mb-2">
                  {plan.name} Data
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  Valid for {plan.validity}
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-xl font-bold text-primary-dark">
                    ₦{plan.price}
                  </span>

                  <button className="bg-primary-dark text-white px-4 py-2 rounded-lg">
                    Buy
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* CABLE TV */}
      <section className="py-20 bg-white">

        <div className="container mx-auto px-4">

          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              DSTV, GOTV & Startimes Subscription
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pay for DSTV, GOTV and Startimes subscriptions instantly online.
            </p>

          </div>

        
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
                      <span className="text-gray-700 font-medium cursor-pointer">{plan}</span>
                      <button onClick={()=>navigate('/signup')} className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                        Subscribe
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>


      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-50">

        <div className="container mx-auto px-4">

          <div className="text-center mb-12">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Winsubz
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Winsubz provides fast, secure and affordable VTU services for buying cheap data and paying bills online.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="p-6 bg-white rounded-xl">
              <FaShieldAlt size={26} className="mb-4 text-primary-dark" />
              <h3 className="font-semibold">Secure Payments</h3>
            </div>

            <div className="p-6 bg-white rounded-xl">
              <FaTachometerAlt size={26} className="mb-4 text-primary-dark" />
              <h3 className="font-semibold">Fast Transactions</h3>
            </div>

            <div className="p-6 bg-white rounded-xl">
              <FaPercent size={26} className="mb-4 text-primary-dark" />
              <h3 className="font-semibold">Affordable Rates</h3>
            </div>

            <div className="p-6 bg-white rounded-xl">
              <FaHeadset size={26} className="mb-4 text-primary-dark" />
              <h3 className="font-semibold">24/7 Support</h3>
            </div>

          </div>

        </div>

      </section>


      {/* TESTIMONIAL */}
      <SectionTestimonial />


      {/* PARTNERS */}
      <section className="py-16 bg-white">

        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Trusted Partners
          </h2>

          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Winsubz partners with trusted telecom providers and bill payment gateways
            to deliver reliable VTU services across Nigeria.
          </p>

          <img src={providers} alt="Telecom and payment partners" className="mx-auto" />

        </div>

      </section>


      {/* SEO BOOST CONTENT */}
      <section className="py-12 bg-gray-50">

        <div className="container mx-auto px-4">

          <h2 className="text-2xl font-bold mb-4">
            Buy Cheap Data & Airtime Online in Nigeria
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Winsubz is a reliable VTU platform in Nigeria where users can buy cheap MTN data,
            Airtel data, Glo data and 9mobile data instantly. You can also recharge airtime,
            pay electricity bills and subscribe to DSTV, GOTV and Startimes easily.
          </p>

        </div>

      </section>


    </div>
  );
};

export default Home;