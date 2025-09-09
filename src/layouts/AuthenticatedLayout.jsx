import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const AuthenticatedLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mainRef = useRef(null);

  // Check if mobile view on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Open on desktop, closed on mobile by default
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  //   const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <ScrollToTop scrollRef={mainRef}/>
      
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          user={user} 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        {/* Main Content */}
        <main className={`md:ml-64 py-6 md:py-4 px-4  flex-1 overflow-y-auto transition-all duration-300 mt-[64px]`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;