import { Wallet, Code, FileSearch, Shield, Download } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: "Connect Wallet",
      description: "Securely connect your MetaMask or Web3 wallet to begin."
    },
    {
      number: "02", 
      icon: Code,
      title: "Explore AI IDE",
      description: "Describe your idea and let the AI generate smart contract code instantly."
    },
    {
      number: "03",
      icon: FileSearch,
      title: "Submit Contract for Audit", 
      description: "Paste your contract address or upload the code to begin AI-based analysis."
    },
    {
      number: "04",
      icon: Shield,
      title: "AI-Powered Smart Audit",
      description: "Our AI detects bugs, risks, and security flaws in seconds using Chainlink Functions."
    },
    {
      number: "05",
      icon: Download,
      title: "Download Report & Mint NFT Badge",
      description: "Get a downloadable audit report and mint an NFT badge as proof of audit."
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-black overflow-hidden">
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
            How{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              AuditLinkAI
            </span>
            {" "}Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Experience the future of smart contract development and auditing with our AI-powered platform
          </p>
        </div>

        {/* Modern Timeline */}
        <div className="relative">
          {/* Mobile Timeline - Vertical Stack */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Mobile Step Content Card */}
                <div className="w-full max-w-md mx-auto">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 group-hover:transform group-hover:scale-105 transition-all duration-300">
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-10">
                        <span className="text-white font-bold text-sm">{step.number}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-heading font-bold mb-3">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                          {step.title}
                        </span>
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline - Vertical Alternating Left/Right */}
          <div className="hidden md:block">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/30 via-cyan-400/50 to-cyan-500/30"></div>
            
            {/* Timeline Steps */}
            <div className="space-y-16 lg:space-y-20">
              {steps.map((step, index) => (
                <div key={index} className={`relative flex items-center animate-fade-in ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`} style={{ animationDelay: `${index * 0.2}s` }}>
                  
                  {/* Step Content Card */}
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 lg:p-8 group-hover:transform group-hover:scale-105 transition-all duration-300">
                        
                        {/* Step Number Badge */}
                        <div className="absolute -top-4 -right-4 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-10">
                          <span className="text-white font-bold text-sm lg:text-lg">{step.number}</span>
                        </div>
                        
                        {/* Icon */}
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 shadow-lg">
                          <step.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-xl lg:text-2xl font-heading font-bold mb-3 lg:mb-4">
                          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                            {step.title}
                          </span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm lg:text-base">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Central Circle Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-black shadow-lg z-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
