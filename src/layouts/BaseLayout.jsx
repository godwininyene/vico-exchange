import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect} from "react";
import ScrollToTop from "../components/ScrollToTop";

const BaseLayout = ()=>{
    useEffect(()=>{
        AOS.init();
    },[])
    return(
        <div>
           <ScrollToTop />
           <Navbar />
           <main className="relative z-10 pt-[70px] min-h-[82vh] overflow-hidden">
                <Outlet />
           </main>
            <Footer/>
        </div>
    )
}

export default BaseLayout;