import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ModernToggle from "@/components/ModernToggle";
import AuditForm from "@/components/AuditForm";
import ContractExplanation from "@/components/ContractExplanation";
import AuditResults from "@/components/AuditResults";
import NFTModal from "@/components/NFTModal";
import SuccessModal from "@/components/SuccessModal";
import { Shield, CheckCircle, AlertCircle, ArrowLeft, X, Info } from "lucide-react";
import { fetchContractSourceCode } from "@/services/etherscanService";
import { auditSmartContract, AuditResult, getUserCredits, deductUserCredit, INITIAL_CREDITS } from "@/services/auditService";
import { executeChainlinkFunctions } from "@/services/chainlinkService";
import { mintNFTToWallet, getNetworkName } from "@/services/nftService";
import { downloadHTMLReport } from "@/services/reportService";
import { supabase } from "@/lib/supabase";
import { getContractExplanationWithGemini } from "@/services/geminiService";
import { uploadJSONToPinata } from "@/services/pinataService";
import { Button } from "@/components/ui/button";
import { Loader2, Award, Download } from "lucide-react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

const SmartAudit = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("sepolia");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
const [polling, setPolling] = useState(false);
  const [contractExplanation, setContractExplanation] = useState("");
  const [toggleState, setToggleState] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [nftMetadata, setNftMetadata] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [metadataPreview, setMetadataPreview] = useState<any>(null);
  const navigate = useNavigate();
  const [credits, setCredits] = useState<number | null>(null);
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const [mintAddress, setMintAddress] = useState<string>("");

  // Fetch credits on wallet connect, page load, or when tab becomes visible
  useEffect(() => {
    const fetchAndSetCredits = async () => {
      if (account?.address) {
        try {
          const userCredits = await getUserCredits(account.address);
          setCredits(userCredits);
        } catch (e) {
          console.error("Failed to fetch credits:", e);
          toast.error("Could not retrieve your audit credits.");
        }
      }
    };

    fetchAndSetCredits();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchAndSetCredits();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [account?.address]);

  const handleToggleChange = (checked: boolean) => {
    setToggleState(checked);
    if (checked) {
      navigate("/solidity-audit");
    }
  };

  const handleAudit = async () => {
    if (!account?.address) {
      toast.error("Please connect your wallet to perform audits");
      navigate('/login');
      return;
    }

    if (credits === null) {
      toast.error("Could not verify your audit credits. Please try again.");
      return;
    }
    
    if (credits <= 0) {
      toast.error("You have no remaining audit credits.");
      return;
    }

    if (!contractAddress.trim()) {
      toast.error("Please enter a contract address");
      return;
    }
    
    // Basic address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress.trim())) {
      toast.error("Please enter a valid Ethereum address");
      return;
    }
    
    setIsAuditing(true);
    setAuditResult(null);
    setContractExplanation("");
    
    try {
      toast.info("🔗 Initiating audit...");
      
      const { sourceCode, contractName, compilerVersion } = await fetchContractSourceCode(contractAddress.trim(), selectedNetwork);
      setContractExplanation("Generating AI explanation...");
        const explanation = await getContractExplanationWithGemini(sourceCode);
        setContractExplanation(explanation);
      
      toast.info("🤖 AI analyzing contract...");
      const chainlinkRequest = {
        contractAddress: contractAddress.trim(),
        sourceCode,
        requestType: 'audit' as const,
        network: selectedNetwork
      };
      
      const chainlinkResponse = await executeChainlinkFunctions(chainlinkRequest);
      const result = await auditSmartContract(sourceCode, contractName);
      
      setAuditResult(result);

      // Deduct credit and update UI
      await deductUserCredit(account.address);
      const newCredits = await getUserCredits(account.address);
      setCredits(newCredits);

      toast.success("✅ Audit completed successfully!");
      
    } catch (error) {
      console.error("Audit error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      
      if (errorMessage.includes("not verified on Etherscan")) {
        toast.error("Audit Failed: Contract Not Verified", {
          description: "The contract's source code must be verified on Etherscan for the audit to proceed."
        });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsAuditing(false);
    }
  };

  const handleMintNFT = async () => {
    if (!auditResult || !account?.address) {
      toast.error("Audit result not available or wallet not connected.");
      return;
    }
    // Build metadata JSON
    const metadata = {
      name: "AuditLinkAI Badge",
      description: "This NFT certifies that the contract was audited using AI technology.",
      image: "https://res.cloudinary.com/draklqbp6/image/upload/v1749913448/6f5f7ddb-9ba6-48a5-a4d6-6577ab897eee_d9mtaj.png", // Use the same Cloudinary image as SolidityAudit for best compatibility
      attributes: [
        { trait_type: "Audit Score", value: auditResult.score?.toString() || "N/A" },
        { trait_type: "Date", value: new Date().toISOString().split('T')[0] },
        { trait_type: "Contract Address", value: contractAddress },
        { trait_type: "Network", value: selectedNetwork },
        { trait_type: "Issues Found", value: auditResult.issues.length.toString() },
        { trait_type: "Wallet Address", value: account.address },
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
    if (!auditResult || !account?.address) {
      toast.error("Audit result not available or wallet not connected.");
      return;
    }

    toast.info("Saving audit badge to your collection...");

    const badgeToStore = {
      name: "AuditLinkAI Verification",
      description: `This NFT certifies that the contract at ${contractAddress} was audited using AI technology and achieved a security score of ${auditResult.score}/100.`,
      image: "/lovable-uploads/5e6c7f03-8a80-470d-97e9-cfe3411fd89d.png",
      attributes: [
        { trait_type: "Audit Score", value: auditResult.score.toString() },
        { trait_type: "Date", value: new Date().toISOString().split('T')[0] },
        { trait_type: "Contract Address", value: contractAddress },
        { trait_type: "Network", value: selectedNetwork },
        { trait_type: "Issues Found", value: auditResult.issues.length.toString() },
      ],
      wallet_address: account.address,
      minted_at: new Date().toISOString(),
    };

    try {
      // Check if a badge for this contract and wallet already exists
      const { data: existingBadge, error: checkError } = await supabase
        .from('badges')
        .select('id')
        .eq('wallet_address', account.address)
        .like('description', `%${contractAddress}%`) // Check if contract address is in description
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
    
    try {
      const reportData = {
        auditResult,
        contractAddress,
        contractName: contractAddress ? `Contract_${contractAddress.slice(0, 8)}` : undefined,
        chainlinkEventId: `CL_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        auditDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        networkUsed: selectedNetwork
      };
      
      downloadHTMLReport(reportData, `auditlink-ai-report-${contractAddress?.slice(0, 8) || 'contract'}-${Date.now()}.html`);
      
      toast.success("Professional audit report downloaded as HTML!", {
        description: "Complete report with AuditLink AI branding and modern design"
      });
    } catch (error) {
      console.error("Error generating HTML report:", error);
      toast.error("Failed to generate HTML report");
    }
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
      // Check if user is on the correct network
      const currentNetwork = await getNetworkName(wallet);
      if (currentNetwork !== selectedNetwork) {
        toast.error(`Please switch to the ${selectedNetwork} network in your wallet`);
        setIsMinting(false);
        return;
      }
      toast.info("Preparing to mint NFT to your wallet...");
      // Mint NFT with Pinata metadata URL as tokenURI
      const mintResult = await mintNFTToWallet(addressToMint, nftMetadata, selectedNetwork, wallet);
      if (mintResult.success) {
        setShowNFTModal(false);
        setShowSuccessModal(true);
        toast.success(`🎉 NFT minted successfully! Token ID: ${mintResult.tokenId}`);
        toast.info(`View on Etherscan: https://${selectedNetwork === 'mainnet' ? '' : selectedNetwork + '.'}etherscan.io/tx/${mintResult.transactionHash}`);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 5000);
      }
    } catch (error: any) {
      console.error("Minting failed:", error);
      toast.error(error.message || "Failed to mint NFT");
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
    link.download = `audit-nft-${contractAddress.slice(0, 8)}.json`;
    link.click();
    URL.revokeObjectURL(url);
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

  // Poll for on-chain audit status if auditResult is a Chainlink audit and score is 0
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (
      auditResult &&
      auditResult.isChainlinkAudit &&
      auditResult.chainlinkRequestId &&
      auditResult.score === 0 &&
      !polling
    ) {
      setPolling(true);
      interval = setInterval(async () => {
        try {
          const status = await import("@/services/auditService").then(m => m.checkChainlinkAuditStatus(auditResult.chainlinkRequestId!, selectedNetwork));
          if (status && status.score && status.score > 0) {
            setAuditResult(prev =>
              prev
                ? {
                    ...prev,
                    ...status,
                    // Preserve required fields from AuditResult
                    issues: prev.issues,
                    recommendations: prev.recommendations,
                    summary: prev.summary
                  }
                : (status as unknown as AuditResult)
            );
            setPolling(false);
            clearInterval(interval);
          }
        } catch (e) {
          // Optionally log error
        }
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
      setPolling(false);
    };
  }, [auditResult, selectedNetwork, polling]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[60%] right-[5%] w-80 h-80 bg-gradient-to-l from-indigo-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-[30%] right-[30%] w-56 h-56 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '9s' }}></div>
        
        {/* Modern stars */}
        <div className="absolute top-[15%] left-[85%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse blur-none shadow-[0_0_6px_#22d3ee]" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[70%] left-[12%] w-2 h-2 bg-blue-400 rounded-full animate-pulse blur-none shadow-[0_0_8px_#60a5fa]" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[40%] left-[88%] w-1 h-1 bg-cyan-300 rounded-full animate-pulse blur-none shadow-[0_0_4px_#67e8f9]" style={{ animationDelay: '7s' }}></div>
        <div className="absolute bottom-[15%] left-[20%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse blur-none shadow-[0_0_6px_#93c5fd]" style={{ animationDelay: '10s' }}></div>
        
        {/* Modern orbs */}
        <div className="absolute top-[25%] left-[5%] w-3 h-3 bg-cyan-400/40 rounded-full blur-sm animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[30%] right-[15%] w-2.5 h-2.5 bg-blue-400/35 rounded-full blur-sm animate-float opacity-55" style={{ animationDelay: '8s' }}></div>
        <div className="absolute top-[80%] right-[8%] w-2 h-2 bg-cyan-300/45 rounded-full blur-sm animate-float opacity-50" style={{ animationDelay: '12s' }}></div>
      </div>

      <Navigation />
      <div className="mt-10 pl-4">
        <ModernToggle toggleState={toggleState} onToggleChange={handleToggleChange} />
      </div>
          
      {/* Hero Section */}
      <div className="pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-8xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-3xl flex items-center justify-center mr-3 sm:mr-4 shadow-2xl shadow-blue-500/30">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                Smart Contract Auditing
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-6xl mx-auto leading-relaxed mb-4 px-4">
              Submit a deployed contract address to receive an instant comprehensive audit report powered by advanced AI technology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-blue-400 px-4">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>AI-Enhanced Analysis</span>
              <span className="text-gray-500">•</span>
              <span>Comprehensive Security Checks</span>
              <span className="text-gray-500">•</span>
              <span>NFT Badge Certification</span>
            </div>
          </div>

          {/* Warning Tag: Smart Audit Sepolia Only */}
          <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 text-yellow-300 font-medium text-sm sm:text-base shadow backdrop-blur-md">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <span>
                <strong>Note:</strong> Smart Audit is performed only on <span className="font-bold text-yellow-200">Sepolia Testnet</span> with <span className="font-bold text-yellow-200">Sepolia ETH tokens</span> using <span className="font-bold text-yellow-200">MetaMask wallet</span>.<br className="hidden sm:inline" /> You can use other features with any supported wallet.
              </span>
            </div>
          </div>

          {/* Main Form/Card Section */}
          <div className="relative">
            {/* The rest of the form/card content goes here */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl shadow-2xl px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 min-h-[520px]">
              {credits !== null && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg bg-gradient-to-r from-cyan-800/80 to-blue-900/80 backdrop-blur-md border border-cyan-400/40">
                    <span className="text-sm font-semibold text-cyan-100">Credits:</span>
                    <span className="text-lg font-bold text-white bg-black/40 px-3 py-0.5 rounded-full border border-cyan-300/40">
                      {credits}
                    </span>
                  </div>
                </div>
              )}
              <AuditForm
                contractAddress={contractAddress}
                setContractAddress={setContractAddress}
                selectedNetwork={selectedNetwork}
                setSelectedNetwork={setSelectedNetwork}
                isAuditing={isAuditing}
                onAudit={handleAudit}
              />

              {/* Important Message - Below the form */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 md:mb-16 max-w-6xl mx-auto">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>
                  <strong>Important:</strong> Ensure the contract is verified on Etherscan and deployed on the selected network for accurate analysis.
                </span>
              </div>

              <ContractExplanation explanation={contractExplanation} />

              {auditResult && (
                <>
                <AuditResults
                  auditResult={auditResult}
                  onMintNFT={handleMintNFT}
                  onStoreBadge={handleStoreBadge}
                  onSaveReport={handleSaveReport}
                  contractAddress={contractAddress}
                />
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
        </div>
      </div>

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

      <SuccessModal isOpen={showSuccessModal} />

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

export default SmartAudit;
