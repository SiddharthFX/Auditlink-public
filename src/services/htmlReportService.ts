
interface ReportData {
  auditResult: any;
  contractAddress: string;
  contractName?: string;
  chainlinkEventId: string;
  auditDate: string;
  networkUsed: string;
}

export const downloadHTMLReport = (reportData: ReportData, filename: string): void => {
  const htmlContent = generateHTMLReport(reportData);
  
  // Create blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.replace('.pdf', '.html');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const formatDate = (dateString: string): string => {
  try {
    // If it's already a formatted date string, return it
    if (dateString.includes(',') || dateString.includes('/')) {
      return dateString;
    }
    
    // Try to parse and format the date
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If parsing fails, return current date formatted
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    // Fallback to current date
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

const generateHTMLReport = (reportData: ReportData): string => {
  const score = reportData.auditResult.score || 0;
  let scoreColor = '#ef4444'; // red-500
  let scoreLabel = 'Critical Risk';
  let scoreBg = '#fef2f2'; // red-50
  
  if (score >= 90) {
    scoreColor = '#22c55e'; // green-500
    scoreLabel = 'Excellent Security';
    scoreBg = '#f0fdf4'; // green-50
  } else if (score >= 75) {
    scoreColor = '#22c55e'; // green-500
    scoreLabel = 'Good Security';
    scoreBg = '#f0fdf4'; // green-50
  } else if (score >= 60) {
    scoreColor = '#f59e0b'; // yellow-500
    scoreLabel = 'Moderate Risk';
    scoreBg = '#fffbeb'; // yellow-50
  } else if (score >= 40) {
    scoreColor = '#f97316'; // orange-500
    scoreLabel = 'High Risk';
    scoreBg = '#fff7ed'; // orange-50
  }

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' };
      case 'high': return { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa' };
      case 'medium': return { bg: '#fffbeb', text: '#d97706', border: '#fde68a' };
      case 'low': return { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' };
      default: return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0' };
    }
  };

  const formattedDate = formatDate(reportData.auditDate);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Contract Security Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: #f9fafb;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
            color: white;
            padding: 3rem 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            box-shadow: 0 10px 25px rgba(14, 165, 233, 0.2);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 2rem;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #0ea5e9;
            font-size: 12px;
        }
        
        .header-title {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }
        
        .header-subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .header-meta {
            text-align: right;
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
        }
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f3f4f6;
        }
        
        .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
        }
        
        .contract-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .info-item {
            padding: 1.5rem;
            background: #f8fafc;
            border-radius: 12px;
            border-left: 4px solid #0ea5e9;
        }
        
        .info-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-value {
            font-size: 1.1rem;
            font-weight: 600;
            color: #111827;
            word-break: break-all;
        }
        
        .score-section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2rem;
            background: ${scoreBg};
            border-radius: 16px;
            margin-bottom: 2rem;
            border: 2px solid ${scoreColor}20;
        }
        
        .score-content {
            flex: 1;
        }
        
        .score-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #111827;
        }
        
        .score-label {
            font-size: 1.2rem;
            color: ${scoreColor};
            font-weight: 600;
        }
        
        .score-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: ${scoreColor};
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            font-weight: 800;
            box-shadow: 0 8px 25px ${scoreColor}40;
        }
        
        .issues-section {
            margin-bottom: 2rem;
        }
        
        .section-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #111827;
        }
        
        .issue-item {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
        }
        
        .issue-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .issue-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: #111827;
        }
        
        .severity-badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .issue-description {
            color: #6b7280;
            line-height: 1.7;
        }
        
        .recommendations-section {
            margin-bottom: 2rem;
        }
        
        .recommendation-item {
            background: #eff6ff;
            border-left: 4px solid #0ea5e9;
            padding: 1.5rem;
            margin-bottom: 1rem;
            border-radius: 0 12px 12px 0;
        }
        
        .recommendation-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: #0ea5e9;
            color: white;
            border-radius: 50%;
            font-size: 0.8rem;
            font-weight: 600;
            margin-right: 1rem;
        }
        
        .summary-section {
            background: #f8fafc;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            border: 1px solid #e2e8f0;
        }
        
        .summary-text {
            color: #374151;
            line-height: 1.8;
            font-size: 1.1rem;
        }
        
        .footer {
            text-align: center;
            padding: 2rem;
            background: #111827;
            color: white;
            border-radius: 16px;
            margin-top: 2rem;
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .footer-brand {
            font-size: 1.2rem;
            font-weight: 700;
        }
        
        .footer-text {
            opacity: 0.8;
        }
        
        .no-issues {
            text-align: center;
            padding: 3rem;
            background: #f0fdf4;
            border-radius: 16px;
            border: 2px solid #22c55e20;
        }
        
        .no-issues-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .no-issues-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #22c55e;
            margin-bottom: 0.5rem;
        }
        
        .no-issues-text {
            color: #059669;
        }
        
        @media print {
            body { background: white; }
            .container { padding: 1rem; }
            .card { box-shadow: none; }
        }
        
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                text-align: center;
            }
            
            .header-meta {
                text-align: center;
            }
            
            .score-section {
                flex-direction: column;
                gap: 1.5rem;
                text-align: center;
            }
            
            .contract-info {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="header-content">
                <div class="logo-section">
                    <div class="logo">
                        AUDIT<br>LINK
                    </div>
                    <div>
                        <h1 class="header-title">Smart Contract Security Report</h1>
                        <p class="header-subtitle">Professional AI-Powered Blockchain Security Analysis</p>
                    </div>
                </div>
                <div class="header-meta">
                    <div>Report ID: ${reportData.chainlinkEventId.substring(0, 16)}...</div>
                    <div>Generated: ${formattedDate}</div>
                    <div>Network: ${reportData.networkUsed.charAt(0).toUpperCase() + reportData.networkUsed.slice(1)}</div>
                </div>
            </div>
        </header>

        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Contract Information</h2>
            </div>
            <div class="contract-info">
                <div class="info-item">
                    <div class="info-label">Contract Address</div>
                    <div class="info-value">${reportData.contractAddress}</div>
                </div>
                ${reportData.contractName ? `
                <div class="info-item">
                    <div class="info-label">Contract Name</div>
                    <div class="info-value">${reportData.contractName}</div>
                </div>
                ` : ''}
                <div class="info-item">
                    <div class="info-label">Audit Date</div>
                    <div class="info-value">${formattedDate}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Network</div>
                    <div class="info-value">${reportData.networkUsed.charAt(0).toUpperCase() + reportData.networkUsed.slice(1)}</div>
                </div>
            </div>
        </div>

        <div class="score-section">
            <div class="score-content">
                <h2 class="score-title">Security Assessment</h2>
                <div class="score-label">${scoreLabel}</div>
            </div>
            <div class="score-circle">
                ${score}<span style="font-size: 1rem;">/100</span>
            </div>
        </div>

        ${reportData.auditResult.issues && reportData.auditResult.issues.length > 0 ? `
        <div class="issues-section">
            <h2 class="section-title">Security Issues Found (${reportData.auditResult.issues.length})</h2>
            ${reportData.auditResult.issues.map((issue: any) => {
              const severityColors = getSeverityColor(issue.severity);
              return `
                <div class="issue-item">
                    <div class="issue-header">
                        <h3 class="issue-title">${issue.title || `${issue.severity || 'Security'} Issue`}</h3>
                        <span class="severity-badge" style="background: ${severityColors.bg}; color: ${severityColors.text}; border: 1px solid ${severityColors.border}">
                            ${(issue.severity || 'Unknown').toUpperCase()}
                        </span>
                    </div>
                    <p class="issue-description">${issue.description || 'No description available'}</p>
                </div>
              `;
            }).join('')}
        </div>
        ` : `
        <div class="no-issues">
            <div class="no-issues-icon">✅</div>
            <h2 class="no-issues-title">No Critical Security Issues Detected</h2>
            <p class="no-issues-text">Your smart contract appears to follow security best practices</p>
        </div>
        `}

        ${reportData.auditResult.recommendations && reportData.auditResult.recommendations.length > 0 ? `
        <div class="recommendations-section">
            <h2 class="section-title">AI Recommendations</h2>
            ${reportData.auditResult.recommendations.map((rec: string, index: number) => `
                <div class="recommendation-item">
                    <span class="recommendation-number">${index + 1}</span>
                    ${rec}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${reportData.auditResult.summary ? `
        <div class="summary-section">
            <h2 class="section-title">AI Analysis Summary</h2>
            <p class="summary-text">${reportData.auditResult.summary}</p>
        </div>
        ` : ''}

        <footer class="footer">
            <div class="footer-content">
                <div class="footer-brand">AuditLink AI</div>
                <div class="footer-text">Professional Smart Contract Security Analysis</div>
                <div class="footer-text">Powered by Chainlink Functions & Advanced AI</div>
            </div>
        </footer>
    </div>
</body>
</html>
  `;
};
