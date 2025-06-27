import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, Clock, ArrowLeft } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/45 to-blue-500/45 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-l from-blue-500/45 to-cyan-500/45 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-10 w-36 h-36 bg-gradient-to-r from-cyan-500/45 to-blue-500/45 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-l from-blue-500/45 to-cyan-500/45 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        
        {/* Modern stars */}
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee] animate-pulse opacity-80" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa] animate-pulse opacity-85" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_4px_#67e8f9] animate-pulse opacity-75" style={{ animationDelay: '5s' }}></div>
        
        {/* Modern orbs */}
        <div className="absolute top-1/6 right-1/6 w-3 h-3 bg-cyan-400/50 rounded-full blur-sm animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/5 left-1/4 w-2.5 h-2.5 bg-blue-400/45 rounded-full blur-sm animate-float opacity-65" style={{ animationDelay: '7s' }}></div>
      </div>

      <Navigation />
      
      <div className="pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
              Have questions about AuditLink AI? We're here to help you with smart contract auditing and development.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            <div className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Email Support
                </span>
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Get in touch via email for detailed inquiries</p>
              <a href="mailto:siddhufx7@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold text-sm sm:text-base">
                siddhufx7@gmail.com
              </a>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Live Chat
                </span>
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Chat with our team for immediate assistance</p>
              <span className="text-cyan-400 font-semibold text-sm sm:text-base">Available 24/7</span>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Response Time
                </span>
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">We respond to all inquiries quickly</p>
              <span className="text-cyan-400 font-semibold text-sm sm:text-base">Within 24 hours</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative group mb-8 sm:mb-12 md:mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Get in Touch
                  </span>
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                  Whether you have questions about our AI-powered smart contract auditing platform, need technical support, 
                  or want to discuss partnership opportunities, our team is ready to assist you.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 text-center">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-2 sm:mb-3">Primary Contact</h3>
                  <p className="text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">
                    For all inquiries, please reach out to us at:
                  </p>
                  <a href="mailto:siddhufx7@gmail.com" className="text-cyan-400 hover:text-cyan-300 font-semibold text-base sm:text-lg transition-colors">
                    siddhufx7@gmail.com
                  </a>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2 sm:mb-3">What We Can Help With</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-left">
                    <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                      <li>• Smart contract auditing questions</li>
                      <li>• AI IDE functionality support</li>
                      <li>• NFT badge minting issues</li>
                    </ul>
                    <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                      <li>• Partnership opportunities</li>
                      <li>• Technical integrations</li>
                      <li>• Enterprise solutions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400/60 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
