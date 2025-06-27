import Navigation from "@/components/Navigation";
import CopyrightSection from "@/components/CopyrightSection";
import { Shield, Cpu, Zap, Users, Award, Globe, Code2, TrendingUp, Target, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle Floating Orb Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[60%] right-[5%] w-80 h-80 bg-gradient-to-l from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-[30%] right-[30%] w-56 h-56 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '9s' }}></div>
      </div>

      <Navigation />
      
      <div className="pt-16 sm:pt-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/10 rounded-full mb-4 sm:mb-6">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm text-cyan-400 font-medium">Our Mission</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4 px-2">
              About{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AuditLink AI
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto px-4">
              We are revolutionizing smart contract security through advanced AI technology, Chainlink Functions, and comprehensive auditing solutions that make Web3 safer for everyone.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 md:p-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Securing the Future of Web3
                  </span>
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                  AuditLink AI combines cutting-edge artificial intelligence with Chainlink's decentralized oracle network to provide 
                  the most comprehensive smart contract auditing platform available today. We're building a safer, more secure blockchain ecosystem 
                  where developers can deploy with confidence and users can interact without fear of vulnerabilities or exploits.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Security First</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Our top priority is ensuring the integrity and safety of smart contracts with zero-tolerance for vulnerabilities and comprehensive threat detection.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Innovation</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Leveraging advanced AI and machine learning to automate complex security analysis, vulnerability detection, and intelligent code generation.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Efficiency</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Automated audits and intelligent code analysis that drastically reduce time-to-market while maintaining the highest quality standards.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Community Driven</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Building an open ecosystem that empowers developers, fosters innovation, and creates a collaborative environment for blockchain security.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4 px-2">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Powered by Advanced Technology
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto px-4">
                Our platform integrates the latest innovations in AI, blockchain, and decentralized infrastructure to deliver unparalleled security analysis.
              </p>
            </div>
            {/* Modern horizontal tech stack cards */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center w-full">
              {/* Thirdweb */}
              <div className="flex-1 min-w-[260px] max-w-sm bg-gradient-to-br from-fuchsia-600/30 via-purple-700/30 to-indigo-800/30 border border-fuchsia-500/30 rounded-2xl shadow-xl backdrop-blur-xl p-8 flex flex-col items-center transition-transform hover:scale-[1.03] hover:shadow-2xl duration-300">
                <div className="w-14 h-14 bg-white flex items-center justify-center rounded-xl mb-4 shadow-lg">
                  <img src="/channels4_profile-removebg-preview.png" alt="Thirdweb logo" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">Thirdweb</h3>
                <p className="text-gray-300 text-sm text-center">Multi-wallet connection and Web3 infrastructure for seamless, secure blockchain interactions across all major wallets.</p>
                  </div>
              {/* Chainlink Functions */}
              <div className="flex-1 min-w-[260px] max-w-sm bg-gradient-to-br from-sky-600/30 via-blue-700/30 to-cyan-800/30 border border-sky-500/30 rounded-2xl shadow-xl backdrop-blur-xl p-8 flex flex-col items-center transition-transform hover:scale-[1.03] hover:shadow-2xl duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center rounded-xl mb-4 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Chainlink Functions</h3>
                <p className="text-gray-300 text-sm text-center">Decentralized computation for secure, verifiable smart contract analysis with tamper-proof audit results stored on-chain.</p>
              </div>
              {/* Google Gemini AI */}
              <div className="flex-1 min-w-[260px] max-w-sm bg-gradient-to-br from-cyan-600/30 via-blue-700/30 to-indigo-800/30 border border-cyan-500/30 rounded-2xl shadow-xl backdrop-blur-xl p-8 flex flex-col items-center transition-transform hover:scale-[1.03] hover:shadow-2xl duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center rounded-xl mb-4 shadow-lg">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Google Gemini AI</h3>
                <p className="text-gray-300 text-sm text-center">State-of-the-art language models for intelligent code analysis, vulnerability detection, and automated security recommendations.</p>
              </div>
              {/* NFT Certification */}
              <div className="flex-1 min-w-[260px] max-w-sm bg-gradient-to-br from-blue-600/30 via-cyan-700/30 to-emerald-800/30 border border-blue-500/30 rounded-2xl shadow-xl backdrop-blur-xl p-8 flex flex-col items-center transition-transform hover:scale-[1.03] hover:shadow-2xl duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center rounded-xl mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">NFT Certification</h3>
                <p className="text-gray-300 text-sm text-center">Blockchain-based audit certificates and achievement badges stored as NFTs for permanent, verifiable proof of security compliance.</p>
              </div>
            </div>
          </div>

          {/* What Sets Us Apart */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4 px-2">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  What Sets Us Apart
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto px-4">
                AuditLink AI isn't just another security tool—we're pioneering the future of automated smart contract security.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Comprehensive Analysis</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Our AI doesn't just scan for known vulnerabilities—it understands code logic, identifies potential attack vectors, and provides actionable recommendations for improvement.</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Intelligent Code Generation</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Beyond auditing, our AI IDE helps developers write secure code from the ground up with real-time suggestions and best practice enforcement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Future Vision */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 md:p-12">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    The Future of Smart Contract Development
                  </span>
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                  We envision a world where smart contract security is seamlessly integrated into every step of the development process. 
                  Through continuous innovation in AI, blockchain technology, and decentralized infrastructure, we're building the tools 
                  that will power the next generation of secure, reliable, and trustworthy decentralized applications. Our mission is to make 
                  Web3 development as secure and accessible as traditional software development, enabling the next wave of blockchain innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CopyrightSection />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-3/4 right-20 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>
    </div>
  );
};

export default About;
