import { Brain, Shield, Code, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Smart Contract Review",
      description: "Instantly analyze and audit your smart contracts using cutting-edge AI models trained on Solidity best practices."
    },
    {
      icon: Code,
      title: "AI-Powered Smart Contract IDE",
      description: "Generate, edit, and deploy smart contracts directly from natural language descriptions using our AI-powered environment."
    },
    {
      icon: Shield,
      title: "Onchain Audit Certification",
      description: "Generate a verifiable Proof-of-Audit NFT for each secure contract — publicly accessible and immutable."
    },
    {
      icon: BookOpen,
      title: "AuditLab",
      description: "Comprehensive learning hub for smart contract development, from fundamentals to advanced security practices and professional deployment."
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-black overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/12 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-400/12 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-300/12 rounded-full blur-xl animate-float" style={{ animationDelay: '6s' }}></div>
        
        {/* Modern stars */}
        <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee] animate-pulse opacity-80" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_4px_#60a5fa] animate-pulse opacity-75" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_8px_#67e8f9] animate-pulse opacity-85" style={{ animationDelay: '8s' }}></div>
        
        {/* Modern orbs */}
        <div className="absolute top-1/6 left-1/6 w-3 h-3 bg-cyan-400/50 rounded-full blur-sm animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/6 right-1/6 w-2.5 h-2.5 bg-blue-400/45 rounded-full blur-sm animate-float opacity-65" style={{ animationDelay: '7s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 sm:mb-6 px-2">
            Features Of{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              AuditLinkAI
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Discover the powerful capabilities that make AuditLinkAI the ultimate smart contract development and auditing platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
                
                <CardContent className="relative p-6 sm:p-8 text-center z-10">
                  {/* Icon with enhanced styling */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 sm:mb-8 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 border border-cyan-400/30 group-hover:border-cyan-300/50 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-white transition-colors duration-300" />
                    
                    {/* Pulse ring effect */}
                    <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 animate-pulse-ring opacity-0 group-hover:opacity-100"></div>
                  </div>

                  {/* Title with gradient hover effect */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-cyan-300 transition-all duration-300">
                      {feature.title}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
