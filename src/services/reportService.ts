import jsPDF from 'jspdf';

interface ReportData {
  auditResult: any;
  contractAddress: string;
  contractName?: string;
  chainlinkEventId: string;
  auditDate: string;
  networkUsed: string;
}

export const downloadPDFReport = (reportData: ReportData, filename: string): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Modern color palette
  const colors = {
    primary: [14, 165, 233], // Blue-500
    secondary: [6, 182, 212], // Cyan-500
    accent: [34, 197, 94], // Green-500
    warning: [251, 191, 36], // Yellow-400
    danger: [239, 68, 68], // Red-500
    dark: [17, 24, 39], // Gray-900
    medium: [75, 85, 99], // Gray-600
    light: [156, 163, 175], // Gray-400
    background: [248, 250, 252], // Gray-50
    white: [255, 255, 255]
  };
  
  let yPosition = 30;
  
  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 40) {
      doc.addPage();
      yPosition = 30;
      return true;
    }
    return false;
  };
  
  // Helper function to add text with proper wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12, lineHeight: number = 1.4) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * (fontSize * lineHeight * 0.3527); // Convert to mm
  };

  // Helper function to create rounded rectangle with shadow
  const createCard = (x: number, y: number, width: number, height: number, fillColor: number[] = colors.white) => {
    // Shadow
    doc.setFillColor(0, 0, 0, 0.1);
    doc.roundedRect(x + 1, y + 1, width, height, 2, 2, 'F');
    // Main card
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.setDrawColor(229, 231, 235); // Gray-200
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, width, height, 2, 2, 'FD');
  };
  
  // MODERN HEADER SECTION
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  // Logo section
  doc.setFillColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.roundedRect(margin, 15, 50, 30, 4, 4, 'F');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('AUDIT', margin + 10, 27);
  doc.setFontSize(12);
  doc.text('LINK AI', margin + 10, 37);
  
  // Main title section
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Smart Contract Security Report', margin + 60, 28);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional AI-Powered Blockchain Security Analysis', margin + 60, 40);
  
  // Report metadata in modern style
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Report ID: ${reportData.chainlinkEventId.substring(0, 16)}...`, pageWidth - 85, 25);
  doc.text(`Generated: ${new Date(reportData.auditDate).toLocaleDateString()}`, pageWidth - 85, 35);
  doc.text(`Network: ${reportData.networkUsed.charAt(0).toUpperCase() + reportData.networkUsed.slice(1)}`, pageWidth - 85, 45);
  
  yPosition = 80;
  
  // CONTRACT INFORMATION CARD
  checkPageBreak(50);
  createCard(margin, yPosition, contentWidth, 45, colors.background);
  
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Contract Information', margin + 15, yPosition + 15);
  
  // Contract details in two columns
  const leftCol = margin + 15;
  const rightCol = margin + contentWidth/2 + 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
  doc.text('Contract Address:', leftCol, yPosition + 28);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  const addressText = `${reportData.contractAddress.substring(0, 20)}...${reportData.contractAddress.substring(reportData.contractAddress.length - 8)}`;
  doc.text(addressText, leftCol, yPosition + 35);
  
  if (reportData.contractName) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
    doc.text('Contract Name:', rightCol, yPosition + 28);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(reportData.contractName, rightCol, yPosition + 35);
  }
  
  yPosition += 65;
  
  // SECURITY SCORE SECTION WITH MODERN DESIGN
  checkPageBreak(80);
  createCard(margin, yPosition, contentWidth, 70, colors.white);
  
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Security Assessment', margin + 15, yPosition + 20);
  
  // Modern score display
  const score = reportData.auditResult.score || 0;
  let scoreColor = colors.danger;
  let scoreLabel = 'Critical Risk';
  
  if (score >= 90) {
    scoreColor = colors.accent;
    scoreLabel = 'Excellent Security';
  } else if (score >= 75) {
    scoreColor = [34, 197, 94]; // Green
    scoreLabel = 'Good Security';
  } else if (score >= 60) {
    scoreColor = colors.warning;
    scoreLabel = 'Moderate Risk';
  } else if (score >= 40) {
    scoreColor = [249, 115, 22]; // Orange
    scoreLabel = 'High Risk';
  }
  
  // Score circle
  const scoreX = margin + contentWidth - 120;
  const scoreY = yPosition + 35;
  
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.circle(scoreX, scoreY, 20, 'F');
  
  doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(score.toString(), scoreX - 8, scoreY + 3);
  doc.setFontSize(12);
  doc.text('/100', scoreX + 8, scoreY + 8);
  
  // Score description
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Overall Score', scoreX + 30, scoreY - 8);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(scoreLabel, scoreX + 30, scoreY + 5);
  
  yPosition += 90;
  
  // ISSUES SECTION WITH MODERN CARDS
  if (reportData.auditResult.issues && reportData.auditResult.issues.length > 0) {
    checkPageBreak(40);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`Security Issues Found (${reportData.auditResult.issues.length})`, margin, yPosition);
    yPosition += 25;
    
    reportData.auditResult.issues.forEach((issue: any, index: number) => {
      const issueHeight = 35;
      checkPageBreak(issueHeight + 10);
      
      // Issue severity color
      let severityColor = colors.light;
      switch (issue.severity?.toLowerCase()) {
        case 'critical':
          severityColor = colors.danger;
          break;
        case 'high':
          severityColor = [249, 115, 22]; // Orange
          break;
        case 'medium':
          severityColor = colors.warning;
          break;
        case 'low':
          severityColor = colors.primary;
          break;
      }
      
      // Issue card
      createCard(margin, yPosition, contentWidth, issueHeight, colors.white);
      
      // Severity indicator
      doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
      doc.roundedRect(margin + 10, yPosition + 8, 4, 20, 1, 1, 'F');
      
      // Issue content
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const issueTitle = issue.title || `${issue.severity || 'Security'} Issue`;
      doc.text(issueTitle, margin + 25, yPosition + 15);
      
      // Severity badge
      doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
      doc.roundedRect(margin + contentWidth - 60, yPosition + 8, 45, 12, 2, 2, 'F');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text((issue.severity || 'Unknown').toUpperCase(), margin + contentWidth - 55, yPosition + 16);
      
      // Issue description
      doc.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      addWrappedText(
        issue.description || 'No description available',
        margin + 25,
        yPosition + 25,
        contentWidth - 90,
        10
      );
      
      yPosition += issueHeight + 8;
    });
  } else {
    checkPageBreak(40);
    createCard(margin, yPosition, contentWidth, 30, [236, 253, 245]); // Light green
    
    doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ No Critical Security Issues Detected', margin + 15, yPosition + 20);
    yPosition += 45;
  }
  
  // RECOMMENDATIONS SECTION
  if (reportData.auditResult.recommendations && reportData.auditResult.recommendations.length > 0) {
    checkPageBreak(40);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Recommendations', margin, yPosition);
    yPosition += 25;
    
    reportData.auditResult.recommendations.forEach((rec: string, index: number) => {
      const recHeight = Math.max(25, Math.ceil(rec.length / 80) * 8 + 15);
      checkPageBreak(recHeight + 5);
      
      createCard(margin, yPosition, contentWidth, recHeight, [239, 246, 255]); // Light blue
      
      // Recommendation number
      doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
      doc.circle(margin + 20, yPosition + 15, 8, 'F');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text((index + 1).toString(), margin + 17, yPosition + 18);
      
      // Recommendation text
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      addWrappedText(rec, margin + 35, yPosition + 15, contentWidth - 50, 11);
      
      yPosition += recHeight + 8;
    });
  }
  
  // AI SUMMARY SECTION
  if (reportData.auditResult.summary) {
    checkPageBreak(60);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Analysis Summary', margin, yPosition);
    yPosition += 25;
    
    const summaryHeight = Math.max(50, Math.ceil(reportData.auditResult.summary.length / 100) * 8 + 20);
    createCard(margin, yPosition, contentWidth, summaryHeight, colors.background);
    
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    addWrappedText(reportData.auditResult.summary, margin + 15, yPosition + 15, contentWidth - 30, 12);
    
    yPosition += summaryHeight + 20;
  }
  
  // Add modern footer to all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer background
    doc.setFillColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.rect(0, pageHeight - 30, pageWidth, 30, 'F');
    
    // Footer content
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('AuditLink AI', margin, pageHeight - 18);
    doc.setFont('helvetica', 'normal');
    doc.text('Professional Smart Contract Security Analysis', margin, pageHeight - 10);
    
    // Page number
    doc.text(`${i} / ${pageCount}`, pageWidth - margin - 15, pageHeight - 18);
    
    // Powered by text
    doc.setTextColor(colors.light[0], colors.light[1], colors.light[2]);
    doc.setFontSize(8);
    doc.text('Powered by Chainlink Functions & Advanced AI', pageWidth - margin - 80, pageHeight - 10);
  }
  
  // Save the PDF
  doc.save(filename);
};

export { downloadHTMLReport } from './htmlReportService';
