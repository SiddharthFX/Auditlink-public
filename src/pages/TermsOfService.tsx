import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { FileText, Scale, Shield, AlertTriangle, ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-l from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 left-10 w-36 h-36 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-l from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <Navigation />
      
      <div className="pt-32 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Please read these terms carefully before using AuditLink AI's smart contract auditing platform.
            </p>
            <p className="text-gray-500 text-sm mt-4">Last updated: December 13, 2024</p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Service Agreement</h3>
              <p className="text-gray-400 text-sm">Legal agreement for using our AI-powered platform</p>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">User Responsibilities</h3>
              <p className="text-gray-400 text-sm">Your obligations when using our services</p>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-orange-400 mb-2">Important Disclaimers</h3>
              <p className="text-gray-400 text-sm">Limitations and risk considerations</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative group mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12 shadow-2xl">
              
              {/* Important Notice */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                  <h3 className="text-lg font-bold text-orange-400">Important Notice</h3>
                </div>
                <p className="text-gray-300">
                  AuditLink AI provides AI-powered smart contract analysis tools. Our platform offers automated auditing assistance, 
                  but does not replace professional security audits. Users are responsible for their own due diligence and risk assessment.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    1. Acceptance of Terms
                  </span>
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  By accessing and using AuditLink AI ("the Service"), you accept and agree to be bound by the terms and 
                  provisions of this agreement. These Terms of Service govern your use of our AI-powered smart contract 
                  auditing platform, including the AI IDE, audit tools, and NFT badge features.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    2. Service Description
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">AuditLink AI provides:</p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li><strong className="text-cyan-400">AI-Powered Smart Contract Generation:</strong> Code generation using Google Gemini AI</li>
                  <li><strong className="text-cyan-400">Automated Audit Analysis:</strong> AI-based security and vulnerability scanning</li>
                  <li><strong className="text-cyan-400">NFT Badge Minting:</strong> Blockchain-based audit verification certificates</li>
                  <li><strong className="text-cyan-400">Chainlink Integration:</strong> Decentralized audit processing capabilities</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    3. User Obligations and Responsibilities
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">Users agree to:</p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li>Use the service responsibly and in compliance with applicable laws</li>
                  <li>Not upload malicious code or attempt to exploit the platform</li>
                  <li>Maintain the security of their wallet connections and private keys</li>
                  <li>Understand that AI-generated audits are supplementary tools, not professional security audits</li>
                  <li>Conduct additional security reviews before deploying smart contracts to mainnet</li>
                  <li>Not rely solely on our platform for critical security decisions</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    4. AI-Generated Content Disclaimer
                  </span>
                </h2>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <p className="text-gray-300">
                    <strong className="text-yellow-400">Important:</strong> All code generated by our AI is provided "as-is" 
                    without warranties. AI-generated smart contracts may contain bugs, vulnerabilities, or logical errors. 
                    Users must thoroughly test and audit all code before deployment.
                  </p>
                </div>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li>AI-generated audits are automated analyses, not comprehensive security reviews</li>
                  <li>False positives and missed vulnerabilities may occur</li>
                  <li>Professional auditing is recommended for production contracts</li>
                  <li>AuditLink AI is not liable for losses from AI-generated content</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    5. Blockchain and Cryptocurrency Risks
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">Users acknowledge the inherent risks of blockchain technology:</p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li>Blockchain transactions are irreversible</li>
                  <li>Gas fees and network congestion may affect transactions</li>
                  <li>Smart contract vulnerabilities can lead to financial losses</li>
                  <li>Regulatory changes may impact blockchain operations</li>
                  <li>Private key loss results in permanent loss of access</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    6. Limitation of Liability
                  </span>
                </h2>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                  <p className="text-gray-300">
                    <strong className="text-red-400">Limitation:</strong> AuditLink AI's liability is limited to the maximum 
                    extent permitted by law. We are not liable for any direct, indirect, incidental, special, or consequential 
                    damages arising from your use of our services.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    7. Service Modifications and Termination
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">
                  We reserve the right to modify, suspend, or discontinue the service at any time. Users will be notified 
                  of significant changes through our platform or email communications.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    8. Governing Law
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">
                  These Terms of Service are governed by the laws of the jurisdiction where AuditLink AI operates, 
                  without regard to conflict of law principles.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Questions About These Terms?</h3>
                <p className="text-gray-300 mb-3">
                  If you have questions about these Terms of Service, please contact our legal team:
                </p>
                <a href="mailto:siddhufx7@gmail.com" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                  siddhufx7@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400/60 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
