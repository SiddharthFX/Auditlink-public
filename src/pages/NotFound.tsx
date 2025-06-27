
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Modern background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
        {/* Modern stars */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee] animate-pulse opacity-80" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_4px_#60a5fa] animate-pulse opacity-75" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_3px_#67e8f9] animate-pulse opacity-70" style={{ animationDelay: '5s' }}></div>
        
        {/* Modern orbs */}
        <div className="absolute top-1/6 right-1/6 w-3 h-3 bg-cyan-400/50 rounded-full blur-sm animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/6 left-1/4 w-2.5 h-2.5 bg-blue-400/45 rounded-full blur-sm animate-float opacity-65" style={{ animationDelay: '6s' }}></div>
        
        {/* Cloud-like shapes */}
        <div className="absolute top-1/5 left-1/5 w-32 h-20 bg-gradient-to-r from-cyan-400/15 to-blue-400/10 rounded-[40px] blur-2xl animate-float opacity-50" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/5 right-1/5 w-28 h-18 bg-gradient-to-l from-blue-400/15 to-cyan-400/10 rounded-[35px] blur-2xl animate-float opacity-45" style={{ animationDelay: '7s' }}></div>
      </div>

      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        <a href="/" className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400/60 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/30">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
