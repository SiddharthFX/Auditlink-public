import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Shield, Eye, Lock, Users, ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Your privacy and security are our top priorities. Learn how we protect your data on AuditLink AI.
            </p>
            <p className="text-gray-500 text-sm mt-4">Last updated: December 13, 2024</p>
          </div>

          {/* Privacy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Transparency</h3>
              <p className="text-gray-400 text-sm">Clear about what data we collect and how we use it</p>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">Security</h3>
              <p className="text-gray-400 text-sm">Advanced encryption and security measures</p>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-400 mb-2">Control</h3>
              <p className="text-gray-400 text-sm">You maintain control over your personal data</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative group mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12 shadow-2xl">
              
              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    1. Information We Collect
                  </span>
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  AuditLink AI collects minimal information necessary to provide our AI-powered smart contract auditing services:
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li><strong className="text-cyan-400">Smart Contract Code:</strong> Code you input for generation or audit analysis</li>
                  <li><strong className="text-cyan-400">Wallet Addresses:</strong> Public wallet addresses for blockchain interactions and NFT minting</li>
                  <li><strong className="text-cyan-400">AI Prompts:</strong> Text descriptions you provide for contract generation</li>
                  <li><strong className="text-cyan-400">Usage Data:</strong> Anonymous analytics to improve our services</li>
                </ul>
                <p className="text-gray-400 mt-4 text-sm">
                  <strong>Important:</strong> We never collect or store private keys, passwords, or sensitive wallet information.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    2. How We Use Your Information
                  </span>
                </h2>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li>Provide AI-powered smart contract generation and auditing services</li>
                  <li>Process blockchain transactions for NFT badge minting</li>
                  <li>Improve our AI models and service quality</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    3. Data Sharing and Third Parties
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">
                  We work with trusted partners to deliver our services:
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li><strong className="text-cyan-400">Google Gemini AI:</strong> For smart contract code generation (code only, no personal data)</li>
                  <li><strong className="text-cyan-400">Chainlink Functions:</strong> For decentralized audit processing</li>
                  <li><strong className="text-cyan-400">Blockchain Networks:</strong> For NFT minting and verification</li>
                </ul>
                <p className="text-gray-400 mt-4">
                  We never sell your personal information to third parties.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    4. Data Security
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">
                  We implement industry-standard security measures:
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure cloud infrastructure with regular security audits</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Regular security monitoring and threat detection</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    5. Your Rights and Choices
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li>Access and review your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of non-essential data collection</li>
                  <li>Download your data in a portable format</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    6. Blockchain and Decentralization
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">
                  Our platform interacts with blockchain networks. Please note:
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
                  <li>Blockchain transactions are permanent and public</li>
                  <li>NFT badges minted through our platform are stored on-chain</li>
                  <li>We cannot modify or delete blockchain-recorded data</li>
                  <li>Smart contract interactions are governed by blockchain protocols</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    7. Changes to This Policy
                  </span>
                </h2>
                <p className="text-gray-300 mb-4">
                  We may update this Privacy Policy to reflect changes in our practices or legal requirements. 
                  We will notify users of significant changes through our platform or email.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Questions About Privacy?</h3>
                <p className="text-gray-300 mb-3">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy;
