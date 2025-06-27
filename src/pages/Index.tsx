import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PartnerLogos from "@/components/PartnerLogos";
import CopyrightSection from "@/components/CopyrightSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Global modern elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-15">
        {/* Floating stars for the entire page */}
        <div className="absolute top-[8%] left-[85%] w-1 h-1 bg-cyan-400 rounded-full animate-float blur-none shadow-[0_0_3px_#22d3ee]" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[75%] left-[15%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-float blur-none shadow-[0_0_4px_#60a5fa]" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[45%] left-[90%] w-1 h-1 bg-cyan-300 rounded-full animate-float blur-none shadow-[0_0_3px_#67e8f9]" style={{ animationDelay: '7s' }}></div>
        
        {/* Global orbs */}
        <div className="absolute top-[12%] left-[8%] w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[20%] right-[12%] w-2.5 h-2.5 bg-blue-400/25 rounded-full blur-sm animate-float opacity-45" style={{ animationDelay: '6s' }}></div>
      </div>
      
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PartnerLogos />
      <CopyrightSection />
    </div>
  );
};

export default Index;
