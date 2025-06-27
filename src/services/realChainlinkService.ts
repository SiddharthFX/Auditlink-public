import { ethers } from 'ethers';

// PRODUCTION CONTRACT ABI - Real Chainlink Audit Contract
const ENHANCED_CHAINLINK_AUDIT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {"internalType": "uint64", "name": "subscriptionId", "type": "uint64"},
      {"internalType": "string[]", "name": "args", "type": "string[]"}
    ],
    "name": "sendAuditRequest",
    "outputs": [{"internalType": "bytes32", "name": "requestId", "type": "bytes32"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "contractAddress", "type": "address"}],
    "name": "getEnhancedAuditResult",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "contractAddress", "type": "address"},
          {"internalType": "uint256", "name": "auditScore", "type": "uint256"},
          {"internalType": "uint256", "name": "issueCount", "type": "uint256"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "bool", "name": "completed", "type": "bool"},
          {"internalType": "string", "name": "securityLevel", "type": "string"},
          {"internalType": "string", "name": "aiSummary", "type": "string"},
          {"internalType": "uint256", "name": "gasOptimizationScore", "type": "uint256"},
          {"internalType": "bool", "name": "hasReentrancyProtection", "type": "bool"},
          {"internalType": "bool", "name": "hasAccessControl", "type": "bool"},
          {"internalType": "bool", "name": "hasInputValidation", "type": "bool"}
        ],
        "internalType": "struct RealChainlinkAuditContract.AuditResult",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "requestId", "type": "bytes32"}],
    "name": "getRequestStatus",
    "outputs": [
      {"internalType": "bool", "name": "completed", "type": "bool"},
      {"internalType": "bytes", "name": "response", "type": "bytes"},
      {"internalType": "bytes", "name": "error", "type": "bytes"},
      {"internalType": "string", "name": "aiSummary", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "contractAddress", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "auditScore", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "issueCount", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "aiAnalysis", "type": "string"}
    ],
    "name": "AuditCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "contractAddress", "type": "address"},
      {"indexed": true, "internalType": "bytes32", "name": "requestId", "type": "bytes32"}
    ],
    "name": "AuditRequested",
    "type": "event"
  }
];

// PRODUCTION DEPLOYED CONTRACT ADDRESS - REAL CHAINLINK FUNCTIONS
const CONTRACT_ADDRESSES = {
  sepolia: "0xB6Ec040df71EaaDdEA225BDfE87b9Be6bca99135", // updated contract address
  mainnet: "0x0000000000000000000000000000000000000000" // Not deployed yet
};

// PRODUCTION Chainlink Functions configuration - REAL subscription
const CHAINLINK_CONFIG = {
  sepolia: {
    subscriptionId: 4910, // REAL subscription with LINK tokens
    gasLimit: 800000,
    donID: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000"
  },
  mainnet: {
    subscriptionId: 0,
    gasLimit: 800000,
    donID: "0x66756e2d657468657265756d2d6d61696e6e65742d3100000000000000000000"
  }
};

interface EnhancedChainlinkAuditRequest {
  contractAddress: string;
  sourceCode: string;
  network: string;
}

interface EnhancedChainlinkAuditResponse {
  requestId: string;
  status: 'pending' | 'completed' | 'failed';
  securityScore?: number;
  score?: number; // <-- Added for frontend compatibility
  securityLevel?: string;
  aiSummary?: string;
  gasOptimizationScore?: number;
  hasReentrancyProtection?: boolean;
  hasAccessControl?: boolean;
  hasInputValidation?: boolean;
  transactionHash?: string;
  error?: string;
}

export const executeRealChainlinkFunctions = async (
  request: EnhancedChainlinkAuditRequest
): Promise<EnhancedChainlinkAuditResponse> => {
  try {
    console.log('🚀 EXECUTING PRODUCTION CHAINLINK FUNCTIONS');
    console.log('📋 Contract to audit:', request.contractAddress);
    console.log('🔗 Using REAL deployed contract:', CONTRACT_ADDRESSES.sepolia);
    console.log('🤖 This will execute REAL AI analysis onchain via Chainlink Functions');
    console.log('💰 This will consume REAL LINK tokens from subscription 4910');
    
    if (!window.ethereum) {
      throw new Error('Ethereum wallet not detected. Please install a wallet to use the PRODUCTION audit system.');
    }

    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      throw new Error('No Ethereum wallet accounts found. Please connect your wallet.');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    console.log('👤 Connected wallet:', userAddress);
    console.log('🔗 Will interact with REAL smart contract');

    const contractAddress = CONTRACT_ADDRESSES[request.network as keyof typeof CONTRACT_ADDRESSES];
    if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
      throw new Error(`PRODUCTION audit contract not deployed on ${request.network}.`);
    }

    const contract = new ethers.Contract(contractAddress, ENHANCED_CHAINLINK_AUDIT_ABI, signer);

    const config = CHAINLINK_CONFIG[request.network as keyof typeof CHAINLINK_CONFIG];
    if (!config || config.subscriptionId === 0) {
      throw new Error(`Network ${request.network} not configured for PRODUCTION audit.`);
    }

    console.log('✅ PRODUCTION Chainlink Functions Configuration:');
    console.log('  🔗 Contract Address:', contractAddress);
    console.log('  🎯 Target Contract:', request.contractAddress);
    console.log('  💳 Subscription ID:', config.subscriptionId);
    console.log('  ⛽ Gas Limit:', config.gasLimit);
    console.log('  🤖 REAL AI will analyze onchain');

    // Validate contract address format
    if (!ethers.isAddress(request.contractAddress)) {
      throw new Error('Invalid contract address format. Please provide a valid Ethereum address.');
    }

    console.log('📤 Sending PRODUCTION audit request with args:', [request.contractAddress, request.network]);
    console.log('🔥 This will trigger REAL Chainlink Functions execution');
    console.log('💰 This will consume REAL LINK tokens');
    
    // Estimate gas first to prevent failures
    let estimatedGas;
    try {
      estimatedGas = await contract.sendAuditRequest.estimateGas(
        config.subscriptionId,
        [request.contractAddress, request.network]
      );
      console.log('⛽ Estimated gas for PRODUCTION audit:', estimatedGas.toString());
    } catch (gasError: any) {
      console.error('❌ Gas estimation failed for PRODUCTION audit:', gasError);
      throw new Error(`PRODUCTION Gas estimation failed: ${gasError.message}. Common causes: 1) Target contract not verified on Etherscan, 2) Insufficient LINK in subscription 4910, 3) Network issues.`);
    }

    // Add 20% buffer to estimated gas for PRODUCTION reliability
    const gasLimitWithBuffer = estimatedGas * BigInt(120) / BigInt(100);
    const finalGasLimit = gasLimitWithBuffer > BigInt(config.gasLimit) ? gasLimitWithBuffer : BigInt(config.gasLimit);

    console.log('⛽ Using gas limit for PRODUCTION audit:', finalGasLimit.toString());
    
    // Send REAL transaction with PRODUCTION gas settings
    const tx = await contract.sendAuditRequest(
      config.subscriptionId,
      [request.contractAddress, request.network],
      {
        gasLimit: finalGasLimit
      }
    );

    console.log('✅ PRODUCTION audit transaction sent:', tx.hash);
    console.log('⏳ Waiting for PRODUCTION transaction confirmation...');
    console.log('🤖 REAL AI will start analyzing onchain after confirmation');

    const receipt = await tx.wait();
    console.log('🎉 PRODUCTION transaction confirmed in block:', receipt.blockNumber);
    console.log('⛽ Gas used for PRODUCTION audit:', receipt.gasUsed.toString());
    console.log('🔥 REAL Chainlink Functions execution has been triggered');

    // Extract tokenId from the Transfer event
    let requestId = '0x' + Math.random().toString(16).substr(2, 64); // Fallback

    try {
      const auditRequestedEvent = receipt.logs.find((log: any) => {
        try {
          const parsedLog = contract.interface.parseLog(log);
          return parsedLog?.name === 'AuditRequested';
        } catch {
          return false;
        }
      });

      if (auditRequestedEvent) {
        const parsedEvent = contract.interface.parseLog(auditRequestedEvent);
        requestId = parsedEvent?.args[1] || requestId;
        console.log('🆔 Extracted REAL request ID from event:', requestId);
      } else {
        console.log('⚠️ AuditRequested event not found, using fallback request ID');
      }
    } catch (error) {
      console.log('ℹ️ Using fallback request ID generation');
    }

    console.log('🤖 PRODUCTION: Chainlink Functions performing REAL AI analysis onchain...');
    console.log('⏳ PRODUCTION timing: This typically takes 30-60 seconds for REAL execution');
    console.log('💰 PRODUCTION cost: This consumed REAL LINK tokens from subscription 4910');

    return {
      requestId: requestId,
      status: 'pending',
      transactionHash: tx.hash,
      aiSummary: 'PRODUCTION: Real AI analysis initiated via Chainlink Functions. Processing onchain with REAL AI...'
    };

  } catch (error: any) {
    console.error('❌ PRODUCTION Chainlink Functions error:', error);
    
    // Enhanced error handling for PRODUCTION
    if (error.message.includes('user rejected')) {
      throw new Error('PRODUCTION: Transaction was rejected by user in Ethereum wallet.');
    }
    if (error.message.includes('insufficient funds')) {
      throw new Error('PRODUCTION: Insufficient ETH for gas fees. Please add ETH to your wallet.');
    }
    if (error.message.includes('execution reverted')) {
      throw new Error('PRODUCTION: Transaction reverted. Common causes: 1) Target contract not verified on Etherscan, 2) Invalid contract address, 3) Network mismatch, 4) Insufficient LINK in subscription 4910.');
    }
    if (error.message.includes('UNPREDICTABLE_GAS_LIMIT')) {
      throw new Error('PRODUCTION: Gas estimation failed. The target contract may not be verified on Etherscan or may not exist.');
    }
    if (error.message.includes('PRODUCTION ACCESS CONTROL')) {
      throw error;
    }
    
    throw new Error(`PRODUCTION Chainlink Functions failed: ${error.message}`);
  }
};

export const checkAuditStatus = async (
  requestId: string,
  network: string
): Promise<EnhancedChainlinkAuditResponse> => {
  try {
    console.log('🔍 Checking PRODUCTION audit status for request:', requestId);
    console.log('🤖 This checks REAL onchain results');
    
    if (!window.ethereum) {
      throw new Error('Ethereum wallet not detected');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contractAddress = CONTRACT_ADDRESSES[network as keyof typeof CONTRACT_ADDRESSES];
    
    if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
      throw new Error(`PRODUCTION contract not deployed on ${network}`);
    }

    const contract = new ethers.Contract(contractAddress, ENHANCED_CHAINLINK_AUDIT_ABI, provider);

    const [completed, response, error, aiSummary] = await contract.getRequestStatus(requestId);
    
    console.log('📊 PRODUCTION audit status (REAL data):', {
      completed,
      hasResponse: response.length > 0,
      hasError: error.length > 0,
      aiSummary: aiSummary || 'Processing REAL AI analysis...'
    });
    
    if (completed && response.length > 0) {
      try {
        const responseString = ethers.toUtf8String(response);
        const auditData = JSON.parse(responseString);
        
        console.log('✅ PRODUCTION audit completed with REAL data:', auditData);
        
        // Always return 'score' for frontend compatibility
        return {
          requestId,
          status: 'completed',
          securityScore: auditData.score || 0,
          score: auditData.score || 0, // <-- ensure score is present
          securityLevel: auditData.securityLevel || 'Unknown',
          aiSummary: auditData.aiSummary || 'PRODUCTION AI analysis completed onchain',
          gasOptimizationScore: auditData.gasOptimizationScore || 0,
          hasReentrancyProtection: auditData.hasReentrancyProtection || false,
          hasAccessControl: auditData.hasAccessControl || false,
          hasInputValidation: auditData.hasInputValidation || false
        };

      } catch (parseError) {
        console.error('Error parsing PRODUCTION audit response:', parseError);
        return {
          requestId,
          status: 'failed',
          error: 'Failed to parse PRODUCTION audit response'
        };
      }
    } else if (error.length > 0) {
      const errorString = ethers.toUtf8String(error);
      console.error('❌ PRODUCTION audit failed with error:', errorString);
      return {
        requestId,
        status: 'failed',
        error: errorString
      };
    } else {
      return {
        requestId,
        status: 'pending',
        aiSummary: 'PRODUCTION AI analysis in progress onchain... Please wait 30-60 seconds for REAL results.'
      };
    }

  } catch (error: any) {
    console.error('❌ PRODUCTION status check error:', error);
    return {
      requestId,
      status: 'failed',
      error: error.message
    };
  }
};

export const waitForAuditCompletion = async (
  requestId: string,
  network: string,
  maxWaitTime: number = 120000
): Promise<EnhancedChainlinkAuditResponse> => {
  const startTime = Date.now();
  const checkInterval = 10000;
  
  console.log('⏳ Starting to wait for PRODUCTION audit completion...');
  console.log(`📋 Max wait time: ${maxWaitTime / 1000} seconds`);
  console.log('🤖 Waiting for REAL AI analysis results');
  
  while (Date.now() - startTime < maxWaitTime) {
    const status = await checkAuditStatus(requestId, network);
    
    if (status.status === 'completed') {
      console.log('✅ PRODUCTION audit completed successfully with REAL results!');
      return status;
    }
    
    if (status.status === 'failed') {
      console.log('❌ PRODUCTION audit failed');
      return status;
    }
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    console.log(`⏳ PRODUCTION audit still pending (${elapsed}s elapsed), checking again in 10 seconds...`);
    console.log('🤖 REAL AI still analyzing onchain');
    await new Promise(resolve => setTimeout(resolve, checkInterval));
  }
  
  return {
    requestId,
    status: 'failed',
    error: 'PRODUCTION audit timeout - Real Chainlink Functions analysis took longer than expected. This is normal for complex contracts.'
  };
};
