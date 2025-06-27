
export interface AuditIssue {
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  lineNumber?: number;
}

export interface AuditResult {
  score: number;
  issues: AuditIssue[];
  recommendations: string[];
  gasOptimization?: string[];
  summary: string;
  contractType?: string;
  securityAnalysis?: string;
  contractExplanation?: string;
  securityLevel?: string;
  chainlinkRequestId?: string;
  isChainlinkAudit?: boolean;
  transactionHash?: string;
  error?: string;
}
