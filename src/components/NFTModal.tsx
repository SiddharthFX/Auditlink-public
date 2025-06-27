import { Button } from "@/components/ui/button";
import { Award, Download, X, ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftMetadata: any;
  onMintToWallet: (mintAddress?: string) => void;
  onDownloadMetadata: () => void;
  isMinting: boolean;
  error?: string | null;
  walletType?: string;
  defaultAddress?: string;
}

const NFTModal = ({
  isOpen,
  onClose,
  nftMetadata,
  onMintToWallet,
  onDownloadMetadata,
  isMinting,
  error,
  walletType = "metamask",
  defaultAddress = ""
}: NFTModalProps) => {
  const [inputAddress, setInputAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  if (!isOpen) return null;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  // Use your custom Cloudinary image
  const nftImageUrl = "https://res.cloudinary.com/draklqbp6/image/upload/v1749913448/6f5f7ddb-9ba6-48a5-a4d6-6577ab897eee_d9mtaj.png";

  // Address validation
  const isValidAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleMint = () => {
    if (walletType === "metamask") {
      onMintToWallet(defaultAddress);
    } else {
      if (!isValidAddress(inputAddress)) {
        setAddressError("Please enter a valid Ethereum address.");
        return;
      }
      setAddressError("");
      onMintToWallet(inputAddress);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 text-center max-h-[80vh] overflow-y-auto">
          {/* Loading State */}
          {!nftMetadata && !error && (
            <div className="flex flex-col items-center justify-center min-h-[200px] animate-pulse">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-4" />
              <div className="text-white font-semibold text-lg mb-1">Loading NFT Preview...</div>
              <div className="text-gray-400 text-sm">Please wait while we fetch your NFT data.</div>
            </div>
          )}
          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mb-4" />
              <div className="text-yellow-400 font-semibold text-lg mb-1">Failed to load NFT Preview</div>
              <div className="text-gray-400 text-sm mb-4">
                Failed to load NFT metadata preview. This is common with IPFS and decentralized storage. <br />
                <span className="text-yellow-300">You can still proceed to mint your NFT. It will appear in your wallet once the network syncs.</span>
              </div>
              <Button onClick={onClose} className="bg-yellow-500/80 text-white px-6 py-2 rounded-lg font-semibold mb-2">Close</Button>
              <Button
                onClick={handleMint}
                disabled={isMinting || (walletType !== "metamask" && !isValidAddress(inputAddress))}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-600 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50 mt-2"
              >
                {isMinting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Minting NFT to Wallet...
                  </div>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Mint NFT Badge to Wallet
                  </>
                )}
              </Button>
            </div>
          )}
          {/* NFT Details State */}
          {nftMetadata && !error && (
            <>
              <div className="mb-4">
                <img 
                  src={nftImageUrl}
                  alt="NFT Badge" 
                  className="w-32 h-40 mx-auto rounded-xl shadow-xl object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {nftMetadata.name}
                </span>
              </h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                {nftMetadata.description}
              </p>
              <div className="space-y-2 mb-4">
                {nftMetadata.attributes.map((attr: any, index: number) => {
                  // Hide wallet address preview if not MetaMask
                  if ((attr.trait_type === "Wallet Address" || attr.trait_type === "Contract Address") && walletType !== "metamask") {
                    return null;
                  }
                  return (
                  <div key={index} className="flex justify-between items-center bg-gray-800/50 rounded-lg p-2">
                    <span className="text-gray-400 text-xs">{attr.trait_type}</span>
                    <span className="text-white font-semibold text-xs">
                      {attr.trait_type === "Contract Address" || attr.trait_type === "Wallet Address" 
                        ? formatAddress(attr.value) 
                        : attr.value}
                    </span>
                  </div>
                  );
                })}
              </div>
              {/* Show input if not MetaMask */}
              {walletType !== "metamask" && (
                <div className="mb-4">
                  <label className="block text-cyan-300 text-sm font-semibold mb-2">
                    Input wallet address that supports Sepolia Testnet
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-cyan-500/40 bg-gray-800/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="0x..."
                    value={inputAddress}
                    onChange={e => setInputAddress(e.target.value)}
                    disabled={isMinting}
                  />
                  {addressError && <div className="text-red-400 text-xs mt-1">{addressError}</div>}
                </div>
              )}
              <div className="space-y-2">
                <Button
                  onClick={handleMint}
                  disabled={isMinting || (walletType !== "metamask" && !isValidAddress(inputAddress))}
                  className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-600 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
                >
                  {isMinting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Minting NFT to Wallet...
                    </div>
                  ) : (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Mint NFT Badge to Wallet
                    </>
                  )}
                </Button>
                <Button
                  onClick={onDownloadMetadata}
                  variant="outline"
                  className="w-full border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 py-2 rounded-lg font-semibold text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download NFT Metadata
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTModal;
