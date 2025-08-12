import { Link } from "react-router-dom";
const SectionCTA = ()=>{
    return(
        <section className="py-16 bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
            Ready to Start Trading?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90" data-aos="fade-up" data-aos-delay="100">
            Join thousands of satisfied traders enjoying our secure platform
          </p>
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <a 
              href="/signup" 
              className="bg-white text-primary-dark hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Trade Online
            </a>
            <Link
              to="/contact" 
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Trade On Whatsapp
            </Link>
          </div>
        </div>
      </section>
    )
}
export default SectionCTA;