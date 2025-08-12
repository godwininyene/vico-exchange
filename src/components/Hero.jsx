import hero_img from './../assets/images/hero_bg.svg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-[#0f172a]">
      <div className="container mx-auto px-4 py-20 ">
        <div className="flex flex-col lg:flex-row  gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
              Sell Gift Cards & Crypto with ease
            </h1>
            <p className="text-lg md:text-xl mb-8 text-text-light">
              Exchange your gift cards and cryptocurrencies at fair rates. Fast payments, no hassle, no complications.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to='/signup' 
                className="bg-primary-dark hover:bg-primary-light text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
              >
                Trade Online
              </Link>
              <Link 
                to='' 
                className="bg-transparent hover:bg-gray-200 border-2 border-primary-light text-primary-light font-medium py-3 px-8 rounded-lg transition-all duration-300"
              >
                Trade On Whatsapp
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img 
              src={hero_img} 
              alt="Digital currency exchange illustration" 
              className="w-full h-auto max-w-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;