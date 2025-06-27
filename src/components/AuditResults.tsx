import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Award, Lightbulb, FileText, Shield, Download, Database } from "lucide-react";
import { AuditResult } from "@/services/auditService";
import { AuditIssue } from "@/types/audit";

interface AuditResultsProps {
  auditResult: AuditResult;
  onMintNFT: () => void;
  onStoreBadge?: () => void;
  onSaveReport?: () => void;
  contractAddress?: string;
}

const AuditResults = ({ auditResult, onMintNFT, onStoreBadge, onSaveReport, contractAddress }: AuditResultsProps) => {
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

  const getHighestSeverity = (issues: AuditIssue[]): 'high' | 'medium' | 'low' | 'none' => {
    if (issues.some(issue => issue.severity === 'critical' || issue.severity === 'high')) {
      return 'high';
    }
    if (issues.some(issue => issue.severity === 'medium')) {
      return 'medium';
    }
    if (issues.some(issue => issue.severity === 'low')) {
      return 'low';
    }
    return 'none';
  };

  const highestSeverity = getHighestSeverity(auditResult.issues);

  const getIssuesHeaderConfig = () => {
    switch (highestSeverity) {
      case 'high':
        return {
          titleClass: 'text-red-400',
          iconBgClass: 'bg-gradient-to-r from-red-500 to-orange-500',
        };
      case 'medium':
        return {
          titleClass: 'text-orange-400',
          iconBgClass: 'bg-gradient-to-r from-orange-500 to-yellow-500',
        };
      case 'low':
        return {
          titleClass: 'text-green-400',
          iconBgClass: 'bg-gradient-to-r from-green-500 to-blue-500',
        };
      default:
        // Fallback for no issues or unknown severity
        return {
          titleClass: 'text-red-400',
          iconBgClass: 'bg-gradient-to-r from-red-500 to-orange-500',
        };
    }
  };

  const issuesHeaderConfig = getIssuesHeaderConfig();

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-gray-900/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl shadow-2xl">
        <CardContent className="p-12">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-4xl font-heading font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                Audit Results
              </span>
            </h3>
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-2xl">Security Score:</span>
              <Badge className={`text-4xl font-bold px-8 py-4 ${getScoreColor(auditResult.score)} bg-transparent border-2 rounded-2xl`}>
                {auditResult.score}/100
              </Badge>
            </div>
          </div>

          {/* Enhanced AI Summary */}
          <div className="mb-10 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-blue-300">
                AI-Powered Analysis Summary
              </h4>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {auditResult.summary}
            </p>
          </div>

          {/* Enhanced Issues Section */}
          {auditResult.issues.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 ${issuesHeaderConfig.iconBgClass} rounded-xl flex items-center justify-center`}>
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h4 className={`text-2xl font-semibold ${issuesHeaderConfig.titleClass}`}>
                  Security Issues Detected ({auditResult.issues.length})
                </h4>
              </div>
              <div className="space-y-4">
                {auditResult.issues.map((issue, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-3 md:mb-0 flex-1">
                      <Badge className={`${getSeverityColor(issue.severity)} border text-sm px-3 py-1 rounded-lg`}>
                        {issue.severity.toUpperCase()}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-gray-300 leading-relaxed text-lg">{issue.description}</p>
                        {issue.lineNumber && (
                          <p className="text-gray-500 text-sm mt-2">Line: {issue.lineNumber}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-gray-400 border-gray-600 flex-shrink-0 px-3 py-1">
                      {issue.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Recommendations */}
          {auditResult.recommendations.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-green-400">
                  AI Recommendations
                </h4>
              </div>
              <div className="space-y-4">
                {auditResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="flex-1 text-gray-300 leading-relaxed text-lg">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gas Optimization */}
          {auditResult.gasOptimization && auditResult.gasOptimization.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-yellow-400">
                  Gas Optimization Opportunities
                </h4>
              </div>
              <div className="space-y-3">
                {auditResult.gasOptimization.map((optimization, index) => (
                  <div key={index} className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-gray-300 leading-relaxed">{optimization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contract Information */}
          {auditResult.contractType && (
            <div className="text-center mb-10">
              <Badge variant="outline" className="text-blue-400 border-blue-500/40 text-lg px-6 py-3 rounded-xl">
                <FileText className="w-5 h-5 mr-3" />
                Contract Type: {auditResult.contractType}
              </Badge>
            </div>
          )}

          {/* Enhanced Security Analysis */}
          {auditResult.securityAnalysis && (
            <div className="mb-10 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-blue-400">
                  Detailed Security Analysis
                </h4>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                {auditResult.securityAnalysis}
              </p>
            </div>
          )}

          {/* Updated Three-Button Action Section with blue-to-cyan gradient */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Mint NFT Button */}
            <Button 
              onClick={onMintNFT}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-medium text-sm border-0 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <Award className="w-4 h-4 mr-2" />
              Mint NFT
            </Button>

            {/* Store Badge Button */}
            <Button 
              onClick={onStoreBadge}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-medium text-sm border-0 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <Database className="w-4 h-4 mr-2" />
              Store Badge
            </Button>

            {/* Save Report Button */}
            <Button 
              onClick={onSaveReport}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-medium text-sm border-0 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Save Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditResults;
