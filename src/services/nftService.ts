import { ethers } from 'ethers';

// Updated ABI for mintBadgeWithURI
const NFT_CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "uri", "type": "string" }
    ],
    "name": "mintBadgeWithURI",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  }
];

// PRODUCTION CONTRACT ADDRESSES
const NFT_CONTRACT_ADDRESSES = {
  sepolia: "0x3C80147017b6Cb11c6cD76fEa3160302A549AF0a",
  mainnet: "0x0000000000000000000000000000000000000000"
};

// Network chain IDs
const NETWORK_CHAIN_IDS = {
  mainnet: '0x1',
  sepolia: '0xaa36a7'
};

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface MintResult {
  success: boolean;
  transactionHash: string;
  tokenId: number;
  error?: string;
}

export const getNetworkName = async (wallet?: any): Promise<string> => {
  try {
    let provider;
    if (wallet && wallet.getSigner) {
      provider = wallet.getSigner();
    } else if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      throw new Error('Wallet not detected');
    }
    const network = await provider.getNetwork();
    switch (network.chainId.toString()) {
      case '1':
        return 'mainnet';
      case '11155111':
        return 'sepolia';
      default:
        return 'unknown';
    }
  } catch (error) {
    console.error('Error getting network name:', error);
    return 'unknown';
  }
};

export const switchToNetwork = async (targetNetwork: string): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error('Ethereum wallet not detected');
    }

    const chainId = NETWORK_CHAIN_IDS[targetNetwork as keyof typeof NETWORK_CHAIN_IDS];
    if (!chainId) {
      throw new Error(`Unsupported network: ${targetNetwork}`);
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });

    return true;
  } catch (error: any) {
    console.error('Error switching network:', error);
    
    // If the network doesn't exist in MetaMask, try to add it
    if (error.code === 4902 && targetNetwork === 'sepolia') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: NETWORK_CHAIN_IDS.sepolia,
            chainName: 'Sepolia Test Network',
            nativeCurrency: {
              name: 'Sepolia ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io/'],
          }],
        });
        return true;
      } catch (addError) {
        console.error('Error adding network:', addError);
        return false;
      }
    }
    
    return false;
  }
};

export const mintNFTToWallet = async (
  walletAddress: string,
  metadataUrl: string, // This should be a URL, not JSON
  network: string = 'sepolia',
  wallet?: any
): Promise<MintResult> => {
  try {
    let signer;
    if (wallet && wallet.getSigner) {
      signer = wallet.getSigner();
    } else if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    } else {
      throw new Error('Wallet not detected. Please connect a wallet to mint NFTs.');
    }
    const contractAddress = NFT_CONTRACT_ADDRESSES[network as keyof typeof NFT_CONTRACT_ADDRESSES];
    if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
      throw new Error(`NFT contract not deployed on ${network}`);
    }
    const contract = new ethers.Contract(contractAddress, NFT_CONTRACT_ABI, signer);
    const tx = await contract.mintBadgeWithURI(walletAddress, metadataUrl);
    const receipt = await tx.wait();
    let tokenId = 1;
    if (receipt?.logs) {
      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog?.name === 'BadgeMinted') {
            tokenId = Number(parsedLog.args[1]);
            break;
          }
        } catch (e) {}
      }
    }
    return {
      success: true,
      transactionHash: tx.hash,
      tokenId,
    };
  } catch (error) {
    console.error('NFT minting failed:', error);
    return {
      success: false,
      transactionHash: '',
      tokenId: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const checkNFTExists = async (
  tokenId: number,
  network: string = 'sepolia'
): Promise<{ exists: boolean; tokenURI?: string }> => {
  try {
    if (!window.ethereum) {
      throw new Error('Ethereum wallet not detected');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contractAddress = NFT_CONTRACT_ADDRESSES[network as keyof typeof NFT_CONTRACT_ADDRESSES];
    
    if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
      throw new Error(`NFT contract not deployed on ${network}`);
    }

    const contract = new ethers.Contract(contractAddress, NFT_CONTRACT_ABI, provider);
    
    const tokenURI = await contract.tokenURI(tokenId);
    
    return {
      exists: true,
      tokenURI: tokenURI
    };

  } catch (error: any) {
    console.log('Token does not exist:', error.message);
    return { exists: false };
  }
};
