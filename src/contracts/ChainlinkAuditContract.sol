
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

contract ChainlinkAuditContract is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    // State variables
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    // Events
    event Response(bytes32 indexed requestId, bytes response, bytes err);
    event AuditRequested(address indexed contractAddress, bytes32 indexed requestId);
    event AuditCompleted(address indexed contractAddress, uint256 auditScore, uint256 issueCount);

    // Struct to store audit results
    struct AuditResult {
        address contractAddress;
        uint256 auditScore;
        uint256 issueCount;
        uint256 timestamp;
        bool completed;
    }

    mapping(bytes32 => AuditResult) public auditResults;
    mapping(address => bytes32) public latestAuditRequest;

    // Chainlink Functions configuration
    address router = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0; // Sepolia router
    string source = 
        "const etherscanApiKey = secrets.etherscanApiKey;"
        "const geminiApiKey = secrets.geminiApiKey;"
        ""
        "// Fetch contract source code from Etherscan"
        "const contractAddress = args[0];"
        "const network = args[1] || 'sepolia';"
        ""
        "const networkUrls = {"
        "  'sepolia': 'https://api-sepolia.etherscan.io/api',"
        "  'mainnet': 'https://api.etherscan.io/api'"
        "};"
        ""
        "const apiUrl = networkUrls[network];"
        "const etherscanResponse = await Functions.makeHttpRequest({"
        "  url: `${apiUrl}?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${etherscanApiKey}`"
        "});"
        ""
        "if (etherscanResponse.error) {"
        "  throw Error('Etherscan API error');"
        "}"
        ""
        "const sourceCode = etherscanResponse.data.result[0].SourceCode;"
        "if (!sourceCode) {"
        "  throw Error('Contract not verified');"
        "}"
        ""
        "// Send to Gemini AI for audit"
        "const auditPrompt = `Audit this Solidity smart contract and return ONLY a JSON response with this exact format: {\"score\": number, \"issues\": number}. Score should be 0-100, issues should be count of security issues found. Contract: ${sourceCode}`;"
        ""
        "const geminiResponse = await Functions.makeHttpRequest({"
        "  url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,"
        "  method: 'POST',"
        "  headers: { 'Content-Type': 'application/json' },"
        "  data: {"
        "    contents: [{"
        "      parts: [{ text: auditPrompt }]"
        "    }]"
        "  }"
        "});"
        ""
        "if (geminiResponse.error) {"
        "  throw Error('AI audit failed');"
        "}"
        ""
        "const auditText = geminiResponse.data.candidates[0].content.parts[0].text;"
        "const jsonMatch = auditText.match(/\\{[^}]*\\}/);"
        "if (!jsonMatch) {"
        "  return Functions.encodeString('Error: Invalid AI response');"
        "}"
        ""
        "const auditResult = JSON.parse(jsonMatch[0]);"
        "return Functions.encodeString(JSON.stringify(auditResult));";

    uint32 gasLimit = 300000;
    bytes32 donID = 0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000; // Sepolia DON ID

    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    // Send audit request to Chainlink Functions
    function sendAuditRequest(
        uint64 subscriptionId,
        string[] calldata args
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (args.length > 0) req.setArgs(args);
        
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        // Store the request mapping
        address contractAddress = parseAddress(args[0]);
        latestAuditRequest[contractAddress] = s_lastRequestId;
        
        emit AuditRequested(contractAddress, s_lastRequestId);
        return s_lastRequestId;
    }

    // Chainlink Functions callback
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert("Request ID mismatch");
        }

        s_lastResponse = response;
        s_lastError = err;

        if (response.length > 0) {
            // Parse the audit result
            string memory responseString = string(response);
            // This is a simplified parser - in production you'd want more robust JSON parsing
            (uint256 score, uint256 issues) = parseAuditResult(responseString);
            
            // Find the contract address for this request
            address contractAddress = findContractByRequestId(requestId);
            
            if (contractAddress != address(0)) {
                auditResults[requestId] = AuditResult({
                    contractAddress: contractAddress,
                    auditScore: score,
                    issueCount: issues,
                    timestamp: block.timestamp,
                    completed: true
                });

                emit AuditCompleted(contractAddress, score, issues);
            }
        }

        emit Response(requestId, s_lastResponse, s_lastError);
    }

    // Helper functions
    function parseAddress(string memory _a) internal pure returns (address) {
        bytes memory tmp = bytes(_a);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint i = 2; i < 2 + 2 * 20; i += 2) {
            iaddr *= 256;
            b1 = uint160(uint8(tmp[i]));
            b2 = uint160(uint8(tmp[i + 1]));
            if ((b1 >= 97) && (b1 <= 102)) {
                b1 -= 87;
            } else if ((b1 >= 65) && (b1 <= 70)) {
                b1 -= 55;
            } else if ((b1 >= 48) && (b1 <= 57)) {
                b1 -= 48;
            }
            if ((b2 >= 97) && (b2 <= 102)) {
                b2 -= 87;
            } else if ((b2 >= 65) && (b2 <= 70)) {
                b2 -= 55;
            } else if ((b2 >= 48) && (b2 <= 57)) {
                b2 -= 48;
            }
            iaddr += (b1 * 16 + b2);
        }
        return address(iaddr);
    }

    function findContractByRequestId(bytes32 requestId) internal view returns (address) {
        // In a production system, you'd maintain a reverse mapping
        // For simplicity, this is a placeholder
        return address(0);
    }

    function parseAuditResult(string memory result) internal pure returns (uint256 score, uint256 issues) {
        // Simplified JSON parsing - in production use a proper JSON library
        // This assumes format: {"score": 85, "issues": 3}
        return (75, 2); // Placeholder - implement proper parsing
    }

    // Getter functions
    function getLatestAuditResult(address contractAddress) external view returns (AuditResult memory) {
        bytes32 requestId = latestAuditRequest[contractAddress];
        return auditResults[requestId];
    }

    function getAuditByRequestId(bytes32 requestId) external view returns (AuditResult memory) {
        return auditResults[requestId];
    }
}
