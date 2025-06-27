
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export interface EtherscanSourceCodeResponse {
  status: string;
  message: string;
  result: Array<{
    SourceCode: string;
    ABI: string;
    ContractName: string;
    CompilerVersion: string;
    OptimizationUsed: string;
    Runs: string;
    ConstructorArguments: string;
    EVMVersion: string;
    Library: string;
    LicenseType: string;
    Proxy: string;
    Implementation: string;
    SwarmSource: string;
  }>;
}

export const fetchContractSourceCode = async (contractAddress: string, network: string = 'sepolia'): Promise<{ sourceCode: string; contractName: string; compilerVersion: string }> => {
  // Map network names to Etherscan API URLs
  const networkUrls: { [key: string]: string } = {
    'sepolia': 'https://api-sepolia.etherscan.io/api',
    'goerli': 'https://api-goerli.etherscan.io/api',
    'mainnet': 'https://api.etherscan.io/api'
  };

  const apiUrl = networkUrls[network] || networkUrls['sepolia'];
  
  try {
    const response = await fetch(
      `${apiUrl}?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Etherscan API error: ${response.status} ${response.statusText}`);
    }

    const data: EtherscanSourceCodeResponse = await response.json();
    
    if (data.status !== '1') {
      throw new Error(`Etherscan API returned error: ${data.message}`);
    }

    if (!data.result || data.result.length === 0) {
      throw new Error('No contract found at this address');
    }

    const contractData = data.result[0];
    
    if (!contractData.SourceCode) {
      throw new Error('Contract source code not verified on Etherscan');
    }

    let sourceCode = contractData.SourceCode;
    
    // Handle cases where source code is JSON (multi-file contracts)
    if (sourceCode.startsWith('{{') && sourceCode.endsWith('}}')) {
      try {
        const sourceJson = JSON.parse(sourceCode.slice(1, -1));
        // Extract main contract source from JSON structure
        if (sourceJson.sources) {
          const mainFile = Object.keys(sourceJson.sources)[0];
          sourceCode = sourceJson.sources[mainFile].content;
        }
      } catch (e) {
        // If parsing fails, use the raw source code
        console.warn('Failed to parse JSON source code, using raw format');
      }
    }

    return {
      sourceCode: sourceCode,
      contractName: contractData.ContractName,
      compilerVersion: contractData.CompilerVersion
    };
    
  } catch (error) {
    console.error('Error fetching contract source code:', error);
    throw new Error(`Failed to fetch contract source code: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
