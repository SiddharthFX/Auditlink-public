import { Brain } from 'lucide-react';

const PartnerLogos = () => {
  const partners = [
    { 
      name: "Thirdweb", 
      logo: "/channels4_profile-removebg-preview.png",
      type: "image"
    },
    { 
      name: "Chainlink", 
      logo: "/lovable-uploads/230ccb97-4df9-4121-8af3-e68089d86e83.png",
      type: "image",
      keepOriginalColor: true
    },
    { 
      name: "Solidity", 
      logo: "/lovable-uploads/3d92b14f-91e7-478d-b909-0980c934d239.png",
      type: "image",
      makeWhite: true
    },
    { 
      name: "NFT", 
      type: "text"
    },
    { 
      name: "AI", 
      type: "icon"
    }
  ];

  return (
    <section className="py-8 sm:py-12 border-t border-gray-800/30 bg-black relative overflow-hidden">
      {/* Background effects matching the theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-32 bg-cyan-500/8 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-40 bg-blue-500/8 rounded-full blur-3xl animate-float opacity-60" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Technology Section */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-center mb-6 sm:mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent px-2">
            Technology Used In AuditLink AI
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10">
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className="group flex flex-col items-center space-y-2 opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Logo/Icon/Text container with enhanced styling */}
                <div className="relative p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-cyan-500/20 backdrop-blur-sm min-w-[60px] min-h-[60px] sm:min-w-[70px] sm:min-h-[70px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {partner.type === "image" && (
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`}
                        className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 ${
                          partner.makeWhite 
                            ? 'filter brightness-0 invert' 
                            : partner.keepOriginalColor 
                              ? '' 
                              : 'brightness-0.7 group-hover:brightness-1'
                        }`}
                      />
                    )}
                    
                    {partner.type === "text" && (
                      <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                        NFT
                      </span>
                    )}
                    
                    {partner.type === "icon" && (
                      <Brain 
                        size={32}
                        className="sm:w-10 sm:h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" 
                      />
                    )}
                  </div>
                  
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 animate-pulse-ring opacity-0 group-hover:opacity-100"></div>
                </div>
                
                {/* Partner name with gradient hover effect */}
                <span className="text-gray-400 group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent font-medium text-xs sm:text-sm transition-all duration-300 font-heading">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-8 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse blur-none shadow-[0_0_4px_#22d3ee]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse blur-none shadow-[0_0_6px_#60a5fa]" style={{ animationDelay: '5s' }}></div>
      </div>
    </section>
  );
};

export default PartnerLogos;
