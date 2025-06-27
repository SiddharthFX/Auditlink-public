import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Shield, 
  Code, 
  Zap, 
  Trophy, 
  Users, 
  Rocket,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Wrench,
  FlaskConical,
  Eye,
  TrendingUp,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const AuditLab = () => {
  const steps = [
    {
      title: "Fundamentals (Beginner)",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      items: [
        "Learn what Ethereum, EVM, and gas are",
        "Understand public/private key cryptography", 
        "Use Remix IDE to write and deploy simple Solidity contracts",
        "Learn Solidity 0.8+: types, modifiers, mappings, structs, events"
      ],
      tools: "Remix, Metamask, Solidity docs",
      goal: "Write a basic contract (e.g., Voting, Counter)"
    },
    {
      title: "Core Development Skills (Intermediate)",
      icon: Code,
      color: "from-cyan-500 to-blue-500",
      items: [
        "Use Hardhat or Foundry for local development",
        "Write tests with Mocha/Chai (Hardhat) or Forge (Foundry)",
        "Learn inheritance, access control, and Ownable, Pausable from OpenZeppelin",
        "Handle errors with require, assert, revert",
        "Work with tokens (ERC-20, ERC-721)"
      ],
      tools: "Hardhat, Foundry, OpenZeppelin",
      goal: "Build production-ready contracts"
    },
    {
      title: "Security & Gas Optimization (Advanced Core)",
      icon: Shield,
      color: "from-green-500 to-cyan-500",
      items: [
        "Checks-Effects-Interactions pattern",
        "Use nonReentrant to prevent reentrancy",
        "Validate all inputs strictly",
        "Pack storage variables for gas efficiency",
        "Use immutable and constant where possible"
      ],
      tools: "AuditLink, Slither, Static Analysis",
      goal: "Master secure coding practices"
    },
    {
      title: "Advanced Concepts",
      icon: Brain,
      color: "from-purple-500 to-cyan-500",
      items: [
        "Modularity — split contracts, use interfaces",
        "Inheritance — build libraries and base contracts",
        "Upgradability — use UUPS proxy pattern",
        "Understand Chainlink oracles (Functions, VRF, Automation)",
        "Handle custom errors, events, fallback & receive functions"
      ],
      tools: "OpenZeppelin Upgrades, Chainlink",
      goal: "Build complex, upgradeable systems"
    },
    {
      title: "Real-World Testing & Auditing",
      icon: FlaskConical,
      color: "from-orange-500 to-cyan-500",
      items: [
        "100% test coverage with Hardhat or Foundry",
        "Use Slither for static analysis",
        "Use Echidna for fuzz/property-based testing",
        "Always verify on Etherscan",
        "Use AuditLink before production deployment"
      ],
      tools: "AuditLink, Slither, Echidna, Etherscan",
      goal: "Deploy with confidence"
    },
    {
      title: "Building Projects That Matter",
      icon: Rocket,
      color: "from-red-500 to-cyan-500",
      items: [
        "ERC20 Token + Airdrop + Staking",
        "NFT Collection + Marketplace",
        "Decentralized Lending DApp",
        "DAO with Voting Logic",
        "AI-powered DApp using Chainlink Functions"
      ],
      tools: "Full Stack + AuditLink",
      goal: "Build portfolio-worthy projects"
    }
  ];

  const tools = [
    { name: "Remix", purpose: "Quick testing & prototyping" },
    { name: "Hardhat", purpose: "Full-stack contract testing" },
    { name: "Foundry", purpose: "High-performance Solidity toolkit" },
    { name: "OpenZeppelin", purpose: "Secure, reusable contracts" },
    { name: "AuditLink", purpose: "AI smart contract auditing in seconds" },
    { name: "Slither", purpose: "Static code analysis" },
    { name: "Tenderly", purpose: "Transaction monitoring" },
    { name: "Etherscan", purpose: "Verification & explorer" }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-cyan-400 rounded-full animate-float blur-none shadow-[0_0_6px_#22d3ee]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[15%] right-[25%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-float blur-none shadow-[0_0_4px_#93c5fd]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-cyan-500 rounded-full animate-float blur-none shadow-[0_0_6px_#06b6d4]" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[70%] right-[20%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-float blur-none shadow-[0_0_4px_#60a5fa]" style={{ animationDelay: '6s' }}></div>
      </div>

      <Navigation />
      
      <div className="pt-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/10 rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm text-cyan-400 font-medium">AuditLab</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-heading font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Your Smart Contract
              </span>
              <br />
              <span className="text-white">Mastery Hub</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
              Your comprehensive smart contract companion. From fundamentals to advanced auditing, AuditLab guides you through every step of becoming a blockchain developer with AI-powered security checks, expert-level optimization techniques, and industry best practices.
            </p>
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="relative group mb-8 sm:mb-12">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-heading font-bold">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      Why Master Smart Contract Development?
                    </span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm sm:text-lg text-gray-300 leading-relaxed mb-3 sm:mb-4">
                      Smart contracts power the $2+ trillion blockchain ecosystem. From DeFi protocols handling billions in value to NFT marketplaces and decentralized autonomous organizations, these self-executing contracts are reshaping finance, art, gaming, and governance.
                    </p>
                    <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
                      As a smart contract developer, you'll command <span className="text-cyan-400 font-semibold">$120K-$300K+ salaries</span> while building the infrastructure of tomorrow's digital economy.
                    </p>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 sm:p-6">
                    <h3 className="text-cyan-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Market Opportunities</h3>
                    <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        High-demand roles at top Web3 companies
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        Freelance projects starting at $5K-$50K+
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        Launch your own DeFi protocols
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        Remote-first global opportunities
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Your Complete Learning Roadmap
                </span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-lg">Follow this proven path from beginner to expert smart contract developer</p>
            </div>

            <div className="grid gap-6 sm:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                  <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <Badge variant="outline" className="text-cyan-400 border-cyan-500/40 text-xs sm:text-sm w-fit">
                            Step {index + 1}
                          </Badge>
                          <h3 className="text-lg sm:text-2xl font-heading font-bold text-white">
                            {step.title}
                          </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <h4 className="text-cyan-400 font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              Key Skills You'll Master
                            </h4>
                            <ul className="space-y-1 sm:space-y-2">
                              {step.items.map((item, i) => (
                                <li key={i} className="text-gray-300 flex items-start gap-2 text-sm sm:text-base">
                                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-blue-400 font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                              <Wrench className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              Essential Tools
                            </h4>
                            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{step.tools}</p>
                            <h4 className="text-green-400 font-semibold mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              Milestone Goal
                            </h4>
                            <p className="text-gray-300 font-medium text-sm sm:text-base">{step.goal}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Professional Developer Toolkit
                </span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-lg">Master these industry-standard tools to build like a pro</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {tools.map((tool, index) => (
                <Card key={index} className="bg-gray-900/80 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group w-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                      <Code className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-1 sm:mb-2">{tool.name}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{tool.purpose}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-6 sm:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    AuditLink: Your AI Security Partner
                  </span>
                </h2>
                <p className="text-base sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
                  Don't deploy vulnerable contracts. AuditLink provides instant, AI-powered security audits using advanced static analysis and machine learning. Get comprehensive reports with vulnerability scores, detailed explanations, and actionable fixes—all in seconds, not weeks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 sm:p-6">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2 sm:mb-3" />
                    <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Instant Results</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Get audit reports in under 30 seconds</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 sm:mb-3" />
                    <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">AI-Powered</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Advanced AI Fine-Tuned To Analyze & Audit the Code</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 sm:p-6">
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2 sm:mb-3" />
                    <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Production Ready</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Deploy with confidence and security</p>
                  </div>
                </div>
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full min-h-[44px]">
                  <Link to="/">Try AuditLink Now</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Your Journey to Blockchain Excellence
                  </span>
                </h2>
                <p className="text-sm sm:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 px-2">
                  The path to becoming a smart contract expert requires dedication, continuous learning, and the right tools. With AuditLab's comprehensive roadmap and AuditLink's security expertise, you'll transform from a curious beginner into a confident blockchain developer ready to build the future of Web3.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-base sm:text-xl font-semibold">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                    <span className="text-cyan-400">Learn with Purpose</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    <span className="text-blue-400">Build with Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    <span className="text-green-400">Deploy with Confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLab;
