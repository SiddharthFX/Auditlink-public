import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Award, Lightbulb, FileText, Code, Upload, Loader2, Zap, Download, X, ArrowLeft, Database, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ModernToggle from "@/components/ModernToggle";
import CopyrightSection from "@/components/CopyrightSection";
import { auditSmartContract } from "@/services/auditService";
import { mintNFTToWallet, getNetworkName } from "@/services/nftService";
import { downloadHTMLReport } from "@/services/reportService";
import { supabase } from "@/lib/supabase";
import type { AuditResult } from "@/types/audit";
import { getContractExplanationWithGemini } from "@/services/geminiService";
import { ethers } from "ethers";
import { uploadJSONToPinata } from "@/services/pinataService";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import NFTModal from "@/components/NFTModal";

// Type definitions
interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

const SolidityAudit = () => {
  const [solidityCode, setSolidityCode] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [contractExplanation, setContractExplanation] = useState("");
  const [toggleState, setToggleState] = useState(true);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [nftMetadata, setNftMetadata] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [metadataPreview, setMetadataPreview] = useState<any>(null);
  const [mintAddress, setMintAddress] = useState<string>("");
  const navigate = useNavigate();
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  const handleToggleChange = (checked: boolean) => {
    setToggleState(checked);
    if (!checked) {
      navigate("/smart-audit");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.sol')) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSolidityCode(e.target?.result as string);
      };
      reader.readAsText(file);
      toast.success(`File ${file.name} uploaded successfully!`);
    } else {
      toast.error("Please upload a valid .sol file");
    }
  };

  const handleAudit = async () => {
    if (!solidityCode.trim()) {
      toast.error("Please provide Solidity code to audit");
      return;
    }
    
    setIsAuditing(true);
    setAuditResult(null);
    setContractExplanation("");
    
    try {
      toast.info("🔗 Initiating code audit...");
      
      const contractName = uploadedFile?.name.replace('.sol', '') || 'SmartContract';
      
      // Generate contract explanation using Gemini AI
      setContractExplanation("Generating AI explanation...");
      try {
        const explanation = await getContractExplanationWithGemini(solidityCode);
        setContractExplanation(explanation);
      } catch (ex) {
        setContractExplanation("Failed to generate AI explanation.");
      }
      
      toast.info("🤖 AI analyzing code...");
      
      // Audit the contract using the audit service.
      // The service will correctly choose local analysis since no address is provided.
      const result = await auditSmartContract(solidityCode, contractName);
      
      setAuditResult(result);
      toast.success("✅ Code audit completed successfully!");
      
    } catch (error) {
      console.error("Audit error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleMintNFT = async () => {
    if (!auditResult) return;
    // Build metadata JSON
    const metadata = {
      name: "AuditLinkAI Badge",
      description: "This NFT certifies that the contract was audited using AI technology.",
      image: "https://res.cloudinary.com/draklqbp6/image/upload/v1749913448/6f5f7ddb-9ba6-48a5-a4d6-6577ab897eee_d9mtaj.png",
      attributes: [
        { trait_type: "Audit Score", value: auditResult.score?.toString() || "N/A" },
        { trait_type: "Date", value: new Date().toISOString().split('T')[0] },
        { trait_type: "Contract Name", value: uploadedFile?.name || "SmartContract" },
        { trait_type: "Issues Found", value: auditResult.issues?.length?.toString() || "0" },
        { trait_type: "Contract Type", value: auditResult.contractType || "Smart Contract" },
        { trait_type: "Wallet Address", value: account?.address || "" }
      ]
    };
    try {
      toast.info("Uploading metadata to Pinata...");
      const metadataUrl = await uploadJSONToPinata(metadata);
      setNftMetadata(metadataUrl);
      setShowNFTModal(true);
      setMintAddress(""); // Reset on open
      toast.success("NFT metadata uploaded to Pinata!");
    } catch (e) {
      toast.error("Failed to upload metadata to Pinata");
    }
  };

  const handleStoreBadge = async () => {
    if (!auditResult) {
      toast.error("No audit results to store");
      return;
    }

    toast.info("Saving audit badge to your collection...");

    const contractName = uploadedFile?.name.replace(".sol", "") || "SmartContract";
    const description = `This NFT certifies that the Solidity code for "${contractName}" was audited using AI technology and achieved a security score of ${auditResult.score}/100.`;

    const badgeToStore = {
      name: "AuditLinkAI Code Verification",
      description: description,
      image: "/lovable-uploads/5e6c7f03-8a80-470d-97e9-cfe3411fd89d.png",
      attributes: [
        { trait_type: "Audit Score", value: auditResult.score.toString() },
        { trait_type: "Date", value: new Date().toISOString().split("T")[0] },
        { trait_type: "Contract Name", value: contractName },
        {
          trait_type: "Issues Found",
          value: auditResult.issues.length.toString(),
        },
        {
          trait_type: "Contract Type",
          value: auditResult.contractType || "Smart Contract",
        },
      ],
      wallet_address: account?.address || "",
      minted_at: new Date().toISOString(),
    };

    try {
      // Check if a badge for this contract and wallet already exists
      const { data: existingBadge, error: checkError } = await supabase
        .from('badges')
        .select('id')
        .eq('wallet_address', account?.address || "")
        .eq('description', description)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116: Exact one row not found
        throw new Error(checkError.message);
      }

      if (existingBadge) {
        toast.warning("This audit badge is already in your collection.");
        return;
      }

      const { error } = await supabase.from("badges").insert(badgeToStore);

      if (error) {
        throw error;
      }

      toast.success("Badge saved to your collection!", {
        description: `You can view it on the Badges page.`,
      });
    } catch (e: any) {
      console.error("Failed to store badge in Supabase", e);
      toast.error(`Could not save badge: ${e.message}`);
    }
  };

  const handleSaveReport = () => {
    if (!auditResult) {
      toast.error("No audit results to save");
      return;
    }
    
    const reportData = {
      auditResult,
      contractAddress: "0x0000000000000000000000000000000000000000", // placeholder for solidity audit
      contractName: uploadedFile?.name.replace('.sol', '') || "SmartContract",
      chainlinkEventId: `CL_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      auditDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      networkUsed: 'solidity-analysis'
    };
    
    downloadHTMLReport(reportData, `auditlink-ai-report-${uploadedFile?.name.replace('.sol', '') || 'contract'}-${Date.now()}.html`);
    
    toast.success("Professional audit report downloaded as HTML!", {
      description: "Complete report with AuditLink AI branding and analysis"
    });
  };

  const handleMintToWallet = async (inputAddress?: string) => {
    const isMetaMask = wallet?.id === "io.metamask";
    const addressToMint = isMetaMask ? account?.address : inputAddress;
    if (!addressToMint || !nftMetadata) {
      toast.error("Wallet address not provided or metadata URL missing");
      return;
    }
    setIsMinting(true);
    try {
      const currentNetwork = await getNetworkName(wallet);
      if (currentNetwork !== "sepolia") {
        toast.error("Please switch to the Sepolia network in your wallet.");
        setIsMinting(false);
        return;
      }
      // Use the real NFT minting service with Pinata metadata URL
      const mintResult = await mintNFTToWallet(addressToMint, nftMetadata, 'sepolia', wallet);
      if (mintResult.success) {
        setShowNFTModal(false);
        setShowSuccessModal(true);
        toast.success(`NFT minted successfully! Token ID: ${mintResult.tokenId}`, {
          description: `Transaction: ${mintResult.transactionHash.slice(0, 10)}...`,
          action: {
            label: "View on Etherscan",
            onClick: () => window.open(`https://sepolia.etherscan.io/tx/${mintResult.transactionHash}`, '_blank')
          }
        });
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Minting failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to mint NFT";
      toast.error(errorMessage, {
        description: "Please check your wallet connection, network, and try again."
      });
    } finally {
      setIsMinting(false);
    }
  };

  const downloadNFTMetadata = () => {
    if (!nftMetadata) return;
    
    const dataStr = JSON.stringify(nftMetadata, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-nft-${uploadedFile?.name || 'contract'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/40";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "low": return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  useEffect(() => {
    async function fetchWithRetry(url, retries = 5, delay = 1000) {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error('Network response was not ok');
          const data = await res.json();
          setMetadataPreview(data);
          return;
        } catch (err) {
          if (i === retries - 1) {
            setMetadataPreview(null);
          } else {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
    }
    if (showNFTModal && nftMetadata) {
      fetchWithRetry(nftMetadata);
    }
  }, [showNFTModal, nftMetadata]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[60%] right-[5%] w-80 h-80 bg-gradient-to-l from-indigo-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-[30%] right-[30%] w-56 h-56 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '9s' }}></div>
        
        {/* Modern stars */}
        <div className="absolute top-[18%] left-[82%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse blur-none shadow-[0_0_6px_#22d3ee]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[65%] left-[8%] w-2 h-2 bg-blue-400 rounded-full animate-pulse blur-none shadow-[0_0_8px_#60a5fa]" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-[35%] left-[92%] w-1 h-1 bg-cyan-300 rounded-full animate-pulse blur-none shadow-[0_0_4px_#67e8f9]" style={{ animationDelay: '8s' }}></div>
        <div className="absolute bottom-[10%] left-[15%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse blur-none shadow-[0_0_6px_#93c5fd]" style={{ animationDelay: '11s' }}></div>
        
        {/* Modern orbs */}
        <div className="absolute top-[22%] left-[3%] w-3 h-3 bg-cyan-400/40 rounded-full blur-sm animate-float opacity-60" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[35%] right-[12%] w-2.5 h-2.5 bg-blue-400/35 rounded-full blur-sm animate-float opacity-55" style={{ animationDelay: '9s' }}></div>
        <div className="absolute top-[75%] right-[5%] w-2 h-2 bg-cyan-300/45 rounded-full blur-sm animate-float opacity-50" style={{ animationDelay: '13s' }}></div>
      </div>

      <Navigation />
          
      {/* Hero Section */}
      <div className="pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6 relative">
        <ModernToggle toggleState={toggleState} onToggleChange={handleToggleChange} />
        
        <div className="container mx-auto max-w-8xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center mr-3 sm:mr-4 shadow-2xl shadow-cyan-500/30">
                <Code className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Solidity Code Auditing
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-6xl mx-auto leading-relaxed mb-4 px-4">
              Upload your Solidity code or paste it directly to receive an instant comprehensive audit report powered by advanced AI technology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-cyan-400 px-4">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>AI-Enhanced Analysis</span>
              <span className="text-gray-500">•</span>
              <span>Comprehensive Security Checks</span>
              <span className="text-gray-500">•</span>
              <span>Instant Results</span>
            </div>
          </div>

          {/* Core Form Section - Broadened */}
          <div className="relative group mb-8 sm:mb-12 md:mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <Card className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl">
              <CardContent className="p-4 sm:p-8 md:p-16">
                <div className="space-y-8 sm:space-y-12">
                  {/* File Upload Section */}
                  <div>
                    <label className="block font-medium mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl">
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        Upload Solidity File (.sol)
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".sol"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="file-upload"
                      />
                      <div className="bg-black/60 border-2 border-dashed border-cyan-500/40 rounded-2xl h-32 sm:h-40 md:h-48 flex items-center justify-center hover:border-cyan-400/60 transition-colors">
                        <div className="text-center px-4">
                          <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mx-auto mb-3 sm:mb-6" />
                          <p className="text-cyan-400 font-medium text-sm sm:text-lg md:text-xl">
                            {uploadedFile ? uploadedFile.name : "Click to upload .sol file"}
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm md:text-lg mt-2 sm:mt-3">or drag and drop your Solidity file here</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Input Section */}
                  <div className="relative">
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                      <span className="px-4 sm:px-8 text-gray-400 text-sm sm:text-lg">OR</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    </div>
                    
                    <label className="block font-medium mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl">
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        Paste Solidity Code
                      </span>
                    </label>
                    <textarea
                      value={solidityCode}
                      onChange={(e) => setSolidityCode(e.target.value)}
                      placeholder={`// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract MyContract {\n    // Paste your Solidity code here...\n    \n    uint256 public value;\n    \n    function setValue(uint256 _value) public {\n        value = _value;\n    }\n}`}
                      className="w-full bg-black/60 border border-cyan-500/40 text-white placeholder:text-gray-500 focus:border-cyan-400/60 focus:ring-cyan-400/30 rounded-2xl p-4 sm:p-6 md:p-8 text-sm sm:text-base md:text-lg font-mono resize-none focus:outline-none"
                      rows={12}
                    />
                  </div>

                  <Button
                    onClick={handleAudit}
                    disabled={!solidityCode.trim() || isAuditing}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-600 text-white py-4 sm:py-6 md:py-8 h-16 sm:h-18 md:h-20 rounded-2xl font-semibold text-lg sm:text-xl md:text-2xl shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 border-0 disabled:opacity-50"
                  >
                    {isAuditing ? (
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-4">
                        <Code className="w-6 h-6 sm:w-8 sm:h-8" />
                        Start Audit
                      </div>
                    )}
                  </Button>

                  <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 sm:p-6">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span>Upload only Solidity (.sol) files. Analysis results will be processed using advanced AI technology.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contract Explanation Section */}
          {contractExplanation && (
            <div className="mb-8 sm:mb-12 md:mb-16 animate-fade-in">
              <Card className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl">
                <CardContent className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold">
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        AI Contract Analysis
                      </span>
                    </h3>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                      {contractExplanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Audit Results */}
          {auditResult && (
            <>
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <Card className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl">
                <CardContent className="p-6 sm:p-8 md:p-12">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-10 gap-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        Code Audit Results
                      </span>
                    </h3>
                    <div className="flex items-center gap-3 sm:gap-6">
                      <span className="text-gray-400 text-lg sm:text-xl md:text-2xl">Security Score:</span>
                      <Badge className={`text-2xl sm:text-3xl md:text-4xl font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 ${getScoreColor(auditResult.score)} bg-transparent border-2 rounded-xl sm:rounded-2xl`}>
                        {auditResult.score}/100
                      </Badge>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="mb-6 sm:mb-10 p-4 sm:p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-300">
                        AI-Powered Code Analysis Summary
                      </h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                      {auditResult.summary}
                    </p>
                  </div>

                  {/* Issues Section */}
                  {auditResult.issues.length > 0 && (
                    <div className="mb-6 sm:mb-10">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                         <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-400">
                          Security Issues Detected ({auditResult.issues.length})
                        </h4>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {auditResult.issues.map((issue, index) => (
                          <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-0 flex-1">
                              <Badge className={`${getSeverityColor(issue.severity)} border text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg`}>
                                {issue.severity.toUpperCase()}
                              </Badge>
                              <div className="flex-1">
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">{issue.description}</p>
                                {issue.lineNumber && (
                                  <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">Line: {issue.lineNumber}</p>
                                )}
                              </div>
                            </div>
                            <Badge variant="outline" className="text-gray-400 border-gray-600 flex-shrink-0 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                              {issue.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {auditResult.recommendations.length > 0 && (
                    <div className="mb-6 sm:mb-10">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-400">
                          AI Recommendations
                        </h4>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        {auditResult.recommendations.map((recommendation, index) => (
                          <div key={index} className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mt-1 text-white">
                                {index + 1}
                              </div>
                              <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">{recommendation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gas Optimization */}
                  {auditResult.gasOptimization && auditResult.gasOptimization.length > 0 && (
                    <div className="mb-6 sm:mb-10">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400">
                          Gas Optimization Opportunities
                        </h4>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        {auditResult.gasOptimization.map((optimization, index) => (
                          <div key={index} className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{optimization}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contract Information */}
                  {auditResult.contractType && (
                    <div className="text-center mb-6 sm:mb-10">
                      <Badge variant="outline" className="text-blue-400 border-blue-500/40 text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        Contract Type: {auditResult.contractType}
                      </Badge>
                    </div>
                  )}

                  {/* Security Analysis */}
                  {auditResult.securityAnalysis && (
                    <div className="mb-6 sm:mb-10 p-4 sm:p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
                          <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-400">
                          Detailed Security Analysis
                        </h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                        {auditResult.securityAnalysis}
                      </p>
                    </div>
                  )}

                  {/* Compact Three-Button Action Section with blue-to-cyan gradient */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {/* Mint NFT Button */}
                    <Button 
                      onClick={handleMintNFT}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm border-0 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Mint NFT
                    </Button>

                    {/* Store Badge Button */}
                    <Button 
                      onClick={handleStoreBadge}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm border-0 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      <Database className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Store Badge
                    </Button>

                    {/* Save Report Button */}
                    <Button 
                      onClick={handleSaveReport}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm border-0 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Save Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 font-medium text-sm shadow backdrop-blur-md">
                  <Info className="w-4 h-4 text-cyan-400" />
                  NFT minting supports only <span className="font-bold text-cyan-300 mx-1">Sepolia Testnet</span>.
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced NFT Modal - Updated Size and Alignment */}
      {showNFTModal && (
        <NFTModal
          isOpen={showNFTModal}
          onClose={() => setShowNFTModal(false)}
          nftMetadata={metadataPreview}
          onMintToWallet={handleMintToWallet}
          onDownloadMetadata={downloadNFTMetadata}
          isMinting={isMinting}
          error={showNFTModal && nftMetadata && !metadataPreview ? 'Failed to load NFT metadata.' : null}
          walletType={wallet?.id === "io.metamask" ? "metamask" : "other"}
          defaultAddress={account?.address}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-green-500/30 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-green-400">Success!</h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg">You successfully passed an AI audit! Your NFT Badge has been minted.</p>
          </div>
        </div>
      )}

      <CopyrightSection />

      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-3/4 right-20 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>
    </div>
  );
};

export default SolidityAudit;
