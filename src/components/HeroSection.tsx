import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] bg-black flex items-center justify-center overflow-hidden">
      {/* Modern Cloud-like Background Elements - Enhanced Visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic cloud shapes - slightly more visible */}
        <div className="absolute top-20 left-1/4 w-96 h-64 bg-gradient-to-br from-cyan-400/35 via-blue-500/25 to-transparent rounded-[100px] blur-3xl animate-float opacity-75 transform rotate-12"></div>
        <div className="absolute top-32 right-1/4 w-80 h-56 bg-gradient-to-bl from-blue-400/35 via-cyan-500/25 to-transparent rounded-[80px] blur-3xl animate-float opacity-75 transform -rotate-12" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-24 left-1/3 w-72 h-48 bg-gradient-to-tr from-cyan-300/30 via-blue-400/20 to-transparent rounded-[90px] blur-2xl animate-float opacity-65 transform rotate-6" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-88 h-60 bg-gradient-to-tl from-blue-300/30 via-cyan-400/20 to-transparent rounded-[110px] blur-2xl animate-float opacity-65 transform -rotate-8" style={{ animationDelay: '9s' }}></div>
        
        {/* Central floating cloud */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-40 bg-gradient-to-r from-cyan-200/25 via-blue-300/20 to-transparent rounded-[70px] blur-xl animate-float opacity-55 transform rotate-3" style={{ animationDelay: '12s' }}></div>
        
        {/* Additional organic shapes for depth */}
        <div className="absolute top-1/3 left-1/5 w-48 h-32 bg-gradient-to-br from-blue-400/25 via-cyan-300/15 to-transparent rounded-[60px] blur-2xl animate-float opacity-45 transform rotate-15" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-56 h-36 bg-gradient-to-tl from-cyan-400/25 via-blue-300/15 to-transparent rounded-[70px] blur-2xl animate-float opacity-45 transform -rotate-15" style={{ animationDelay: '8s' }}></div>
      </div>

      {/* Corner Cloud Elements - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-20 bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-transparent rounded-[40px] blur-lg animate-float opacity-60 transform rotate-12"></div>
        <div className="absolute top-10 right-10 w-40 h-24 bg-gradient-to-bl from-blue-400/25 via-cyan-500/15 to-transparent rounded-[50px] blur-lg animate-float opacity-60 transform -rotate-12" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-10 left-10 w-36 h-22 bg-gradient-to-tr from-cyan-300/20 via-blue-400/12 to-transparent rounded-[45px] blur-md animate-float opacity-50 transform rotate-8" style={{ animationDelay: '8s' }}></div>
        <div className="absolute bottom-10 right-10 w-44 h-26 bg-gradient-to-tl from-blue-300/20 via-cyan-400/12 to-transparent rounded-[55px] blur-md animate-float opacity-50 transform -rotate-8" style={{ animationDelay: '12s' }}></div>
      </div>

      {/* Glowing Stars - Perfect Placement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-pulse opacity-90" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_6px_#60a5fa] animate-pulse opacity-80" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_4px_#67e8f9] animate-pulse opacity-75" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_6px_#93c5fd] animate-pulse opacity-85" style={{ animationDelay: '7s' }}></div>
        <div className="absolute bottom-1/4 left-2/5 w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4] animate-pulse opacity-90" style={{ animationDelay: '9s' }}></div>
        <div className="absolute top-2/5 right-2/5 w-0.5 h-0.5 bg-blue-500 rounded-full shadow-[0_0_4px_#3b82f6] animate-pulse opacity-70" style={{ animationDelay: '11s' }}></div>
        
        {/* Additional modern stars */}
        <div className="absolute top-1/5 left-2/3 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee] animate-pulse opacity-85" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/5 right-1/5 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa] animate-pulse opacity-90" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Modern Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/6 left-1/6 w-3 h-3 bg-cyan-400/60 rounded-full blur-sm animate-float opacity-70" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-5/6 right-1/6 w-2 h-2 bg-blue-400/50 rounded-full blur-sm animate-float opacity-60" style={{ animationDelay: '8s' }}></div>
        <div className="absolute top-1/2 right-1/6 w-2.5 h-2.5 bg-cyan-300/55 rounded-full blur-sm animate-float opacity-65" style={{ animationDelay: '12s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center transform translate-y-12">
        {/* Badge */}
        <div className="flex justify-center mb-6 sm:mb-10 animate-fade-in">
          <Badge className="bg-gray-900/40 text-cyan-400 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full backdrop-blur-md">
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2" />
            Own your Security
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight animate-fade-in px-2">
          <span className="text-white font-light">Take Control of your</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
            Smart Contracts
          </span>
          <span className="text-white font-light"> with</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
            Auditlink
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-14 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light px-4">
          Audit, verify, and secure your contracts using AI and Chainlink Functions — all onchain
        </p>

        {/* Single Call to Action Button */}
        <div className="flex justify-center animate-fade-in px-4">
          <Button 
            size="lg"
            onClick={() => navigate("/smart-audit")}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg font-medium rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border-0 backdrop-blur-sm w-full sm:w-auto"
          >
            Get started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
