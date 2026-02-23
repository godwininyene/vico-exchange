import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import michael from './../assets/images/avatar-1.jpg';
import sarah from './../assets/images/sarah.jpg';
import amina from './../assets/images/amina.jpg';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Crypto Trader",
    image: sarah,
    content: "Vico Exchange made selling my Bitcoin effortless. I received payment within minutes after verification. Their rates are really fair.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Gift Card Seller",
    image: michael,
    content: "I've used several platforms, but none compare to Vico Exchange speed and customer service. My gift cards were credited almost instantly.",
    rating: 5
  },
  {
    id: 3,
    name: "Amina Okafor",
    role: "VTU User",
    image: amina,
    content: "Buying data and airtime is super fast. I topped up my MTN line in seconds and it worked perfectly.",
    rating: 5
  }
];

const SectionTestimonial = () => {
  return (
    <section className="py-16 bg-[#FFF9E1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of users for trading, VTU top-ups, and cable subscriptions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <div className="flex items-center mb-6">
                <div className="relative mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-dark"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary-dark text-white rounded-full p-1">
                    <FaQuoteLeft size={12} />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`inline-block mr-1 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8" data-aos="fade-up">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-dark">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>

          <div className="h-12 w-px bg-gray-300 hidden md:block"></div>

          <div className="text-center">
            <div className="text-3xl font-bold text-primary-dark">98%</div>
            <div className="text-gray-600">Recommend Us</div>
          </div>

          <div className="h-12 w-px bg-gray-300 hidden md:block"></div>

          <div className="text-center">
            <div className="text-3xl font-bold text-primary-dark">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonial;
