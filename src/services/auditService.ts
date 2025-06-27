import { executeChainlinkFunctions, checkProductionAuditStatus } from './chainlinkService';
import { auditCodeWithGemini } from './geminiService';
import type { AuditResult } from '@/types/audit';
import { supabase } from '@/lib/supabase';

export type { AuditIssue, AuditResult } from '@/types/audit';

export const INITIAL_CREDITS = 20;

// Gets the user's credit balance. If the user doesn't exist, it creates them.
export async function getUserCredits(walletAddress: string): Promise<number> {
  // First, try to fetch the user.
  let { data, error } = await supabase
    .from('user_credits')
    .select('credits_remaining')
    .eq('wallet_address', walletAddress)
    .single();

  // If the user does not exist (error code PGRST116: "Not a single row was found"), create them.
  if (error && error.code === 'PGRST116') {
    const { data: newUser, error: insertError } = await supabase
      .from('user_credits')
      .insert({ wallet_address: walletAddress, credits_remaining: INITIAL_CREDITS })
      .select('credits_remaining')
      .single();

    if (insertError) {
      console.error('Error creating new user for credits:', insertError);
      throw new Error(`Could not create user: ${insertError.message}`);
    }
    return newUser?.credits_remaining ?? 0;
  }
  
  if (error) {
    console.error('Error fetching user credits:', error);
    throw new Error(`Could not fetch credits: ${error.message}`);
  }

  return data?.credits_remaining ?? 0;
}

// Calls the Supabase RPC function to deduct one credit.
export async function deductUserCredit(walletAddress: string): Promise<void> {
  const { error } = await supabase.rpc('deduct_credit', {
    p_wallet_address: walletAddress,
  });

  if (error) {
    console.error('Error deducting credit:', error);
    throw new Error(`Could not deduct credit: ${error.message}`);
  }
}

export const auditSmartContract = async (
  code: string, 
  contractName?: string,
  contractAddress?: string,
  network: string = 'sepolia',
  useChainlink: boolean = true
): Promise<AuditResult> => {
  
  if (contractAddress) {
    // A contract address is provided, so run the on-chain Chainlink Functions audit.
    console.log('🚀 PRODUCTION AUDIT: Starting real Chainlink Functions audit for address:', contractAddress);
    
    try {
      const chainlinkResponse = await executeChainlinkFunctions({
        contractAddress,
        sourceCode: code, // The on-chain function will fetch the verified source code.
        requestType: 'audit',
        network
      });

      console.log('✅ REAL Chainlink audit request submitted successfully');
      
      return {
        score: 0,
        issues: [],
        recommendations: [
          "🔄 PRODUCTION AUDIT IN PROGRESS: Real Chainlink Functions is analyzing your contract onchain",
          "⏳ WAIT TIME: Production AI analysis typically takes 30-60 seconds for complete results",
          "🔍 REAL ANALYSIS: This is not a simulation - actual AI is running onchain via Chainlink Functions"
        ],
        summary: `🚀 PRODUCTION Chainlink AI Analysis initiated! Request ID: ${chainlinkResponse.requestId}. Real AI analysis is now processing onchain.`,
        securityLevel: "🔄 ANALYZING ONCHAIN...",
        chainlinkRequestId: chainlinkResponse.requestId,
        isChainlinkAudit: true,
        transactionHash: chainlinkResponse.transactionHash
      };
      
    } catch (error: any) {
      console.error('❌ PRODUCTION Chainlink audit failed:', error);
      throw new Error(`❌ PRODUCTION AUDIT FAILED: ${error.message}. This application only uses real Chainlink Functions. Common solutions: 1) Ensure contract is verified on Etherscan, 2) Check you're using the deployer wallet, 3) Verify network is Sepolia, 4) Ensure subscription 4910 has LINK tokens.`);
    }
  } else {
    // No contract address, so this is a code-only audit. Use Gemini AI for analysis.
    console.log('🚀 AI-POWERED AUDIT: Starting direct code analysis with Gemini AI...');
    return await auditCodeWithGemini(code);
  }
};

// Function to check REAL Chainlink audit status
export const checkChainlinkAuditStatus = async (requestId: string, network: string = 'sepolia') => {
  try {
    console.log('🔍 Checking REAL audit status:', requestId);
    const status = await checkProductionAuditStatus(requestId, network);
    console.log('📊 PRODUCTION audit status result:', status);
    return status;
  } catch (error) {
    console.error('❌ Error checking REAL Chainlink audit status:', error);
    return null;
  }
};

/**
 * Track a unique user by wallet address in Supabase.
 * Call this after wallet connects. No duplicates due to upsert.
 */
export async function trackUser(walletAddress: string) {
  if (!walletAddress) return;
  await supabase
    .from("users")
    .upsert({ wallet_address: walletAddress }, { onConflict: "wallet_address" });
}
