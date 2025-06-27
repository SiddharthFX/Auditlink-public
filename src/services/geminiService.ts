import { AuditResult } from "@/types/audit";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;

const CODE_GENERATION_PROMPT = `You are an expert Solidity smart contract developer. Your task is to generate clean, secure, and well-documented Solidity code based on user requirements.

IMPORTANT INSTRUCTIONS:
1. Return ONLY the Solidity code - no explanations, no markdown formatting, no JSON structure, no comments unless absolutely necessary for functionality
2. Include proper SPDX license identifier and pragma statements
3. Focus on security and gas optimization
4. Use modern Solidity syntax (0.8.x)
5. Include proper error handling and access controls
6. Generate production-ready code that is secure and follows best practices

Generate clean, pure Solidity code without extra explanations:`;

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateSmartContract = async (userPrompt: string): Promise<{ code: string, score: number }> => {
  try {
    console.log("🤖 Sending request to Gemini AI for code generation...");
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${CODE_GENERATION_PROMPT}\n\nUser Request: ${userPrompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini AI');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log("📋 Gemini AI code generation completed");
    
    // Clean the code - remove any markdown formatting or explanations
    let cleanCode = generatedText.trim();
    
    // Remove markdown code blocks if present
    cleanCode = cleanCode.replace(/```solidity\n?/g, '');
    cleanCode = cleanCode.replace(/```\n?/g, '');
    
    // Remove any leading/trailing whitespace
    cleanCode = cleanCode.trim();
    
    // Generate a realistic security score based on code complexity and security features
    const lines = cleanCode.split('\n').length;
    const hasModifiers = cleanCode.includes('modifier');
    const hasOwnership = cleanCode.includes('owner') || cleanCode.includes('Ownable');
    const hasReentrancyGuard = cleanCode.includes('ReentrancyGuard') || cleanCode.includes('nonReentrant');
    const hasAccessControl = cleanCode.includes('AccessControl') || cleanCode.includes('onlyOwner');
    const hasSafemath = cleanCode.includes('SafeMath') || cleanCode.includes('unchecked');
    
    let score = 75; // Base score
    if (hasModifiers) score += 5;
    if (hasOwnership) score += 5;
    if (hasReentrancyGuard) score += 8;
    if (hasAccessControl) score += 5;
    if (hasSafemath) score += 2;
    if (lines > 50) score += 3; // Bonus for comprehensive contracts
    
    // Cap at 95 for AI-generated code
    score = Math.min(score, 95);
    
    console.log(`✅ Code generation completed with security score: ${score}/100`);
    
    return { code: cleanCode, score };
    
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    throw new Error(`Failed to generate code with Gemini AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const CODE_AUDIT_PROMPT = `You are an expert Solidity smart contract security auditor. Your task is to audit the given Solidity code and provide a comprehensive security analysis.

IMPORTANT INSTRUCTIONS:
1.  Analyze the code for common vulnerabilities including, but not limited to: reentrancy, access control issues, integer overflow/underflow, unsafe delegatecall, timestamp dependence, oracle manipulation, and gas optimization opportunities.
2.  Provide a summary of the contract's purpose and the overall security posture.
3.  List all identified issues with a severity level ('low', 'medium', 'high', 'critical').
4.  Provide actionable recommendations to fix the identified issues.
5.  List any gas optimization opportunities.
6.  Return ONLY a raw JSON object with the following structure. Do NOT wrap it in markdown \`\`\`json or any other text.

JSON Structure:
{
  "issues": [{ "type": string, "severity": "low" | "medium" | "high" | "critical", "description": string }],
  "recommendations": string[],
  "gasOptimization": string[],
  "summary": string
}

Now, audit the following Solidity code:`;

export const auditCodeWithGemini = async (code: string): Promise<AuditResult> => {
  try {
    console.log("🤖 Sending request to Gemini AI for code audit...");
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${CODE_AUDIT_PROMPT}\n\n${code}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 1,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini AI for audit');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    let cleanJson = generatedText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.slice(7, -3).trim();
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.slice(3, -3).trim();
    }
    
    console.log("✅ Gemini AI audit completed");

    const auditData = JSON.parse(cleanJson);
    
    // Calculate score based on issues found
    let score = 100;
    if (auditData.issues && Array.isArray(auditData.issues)) {
      auditData.issues.forEach((issue: { severity: string }) => {
        switch (issue.severity?.toLowerCase()) {
          case 'critical':
            score -= 25;
            break;
          case 'high':
            score -= 15;
            break;
          case 'medium':
            score -= 5;
            break;
          case 'low':
            score -= 2;
            break;
        }
      });
    }

    // Update score and security level based on calculated score
    auditData.score = Math.max(0, score);

    if (auditData.score >= 90) {
      auditData.securityLevel = 'Low Risk';
    } else if (auditData.score >= 75) {
      auditData.securityLevel = 'Medium Risk';
    } else if (auditData.score >= 50) {
      auditData.securityLevel = 'High Risk';
    } else {
      auditData.securityLevel = 'Critical Risk';
    }
    
    return {
      ...auditData,
      isChainlinkAudit: false,
    };
    
  } catch (error) {
    console.error('Error calling Gemini AI for audit:', error);
    throw new Error(`Failed to audit code with Gemini AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

const CONTRACT_EXPLANATION_PROMPT = `You are an expert Solidity smart contract developer and technical writer. Given the following Solidity code, explain in 3-4 concise, clear sentences what this contract does, its main features, and its purpose. Do not include code, markdown, or extra formatting—just a plain, human-readable explanation for a non-technical user.`;

export const getContractExplanationWithGemini = async (code: string): Promise<string> => {
  try {
    console.log("🤖 Requesting contract explanation from Gemini AI...");
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${CONTRACT_EXPLANATION_PROMPT}\n\n${code}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 512,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No explanation generated from Gemini AI');
    }
    const explanation = data.candidates[0].content.parts[0].text.trim();
    return explanation;
  } catch (error) {
    console.error('Error calling Gemini AI for contract explanation:', error);
    throw new Error(`Failed to get contract explanation from Gemini AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
