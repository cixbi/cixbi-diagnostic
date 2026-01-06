import { Scores, ProfileContent } from '../types';

export const getReportHTML = (scores: Scores, content: ProfileContent) => {
  const ciPercent = Math.round((scores.ci / 36) * 100);
  const biPercent = Math.round((scores.bi / 36) * 100);
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedHelp = content.help.replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Creative Diagnostic Results - ${date}</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #111827;
      background: white;
      line-height: 1.6;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      position: relative;
    }
    .header {
      margin-bottom: 15mm;
      padding-bottom: 8mm;
      border-bottom: 1px solid #e5e7eb;
    }
    .title-main {
      font-size: 14pt;
      font-weight: 300;
      line-height: 1.4;
      margin-bottom: 4mm;
    }
    .title-main .creative {
      color: #059669;
      font-style: italic;
    }
    .title-main .business {
      font-style: italic;
    }
    .date {
      font-size: 9pt;
      color: #6b7280;
    }
    .result-header {
      margin-bottom: 10mm;
    }
    .label {
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6b7280;
      margin-bottom: 2mm;
    }
    .result-title {
      font-size: 18pt;
      font-weight: 700;
      margin-bottom: 3mm;
    }
    .result-headline {
      font-size: 12pt;
      color: #4b5563;
      line-height: 1.5;
    }
    .scores-container {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 6mm;
      margin: 8mm 0;
    }
    .score-row {
      margin-bottom: 4mm;
    }
    .score-row:last-child {
      margin-bottom: 0;
    }
    .score-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2mm;
      font-size: 9pt;
    }
    .score-label {
      font-weight: 600;
    }
    .score-label.creative {
      color: #059669;
      font-style: italic;
    }
    .score-label.business {
      color: #111827;
      font-style: italic;
    }
    .score-value {
      color: #6b7280;
    }
    .score-bar {
      width: 100%;
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      overflow: hidden;
    }
    .score-fill {
      height: 100%;
    }
    .score-fill.creative {
      background: #059669;
    }
    .score-fill.business {
      background: #111827;
    }
    .section {
      margin-bottom: 8mm;
    }
    .section-title {
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6b7280;
      margin-bottom: 2mm;
      padding-bottom: 1.5mm;
      border-bottom: 1px solid #e5e7eb;
    }
    .section-content {
      font-size: 10pt;
      line-height: 1.7;
      color: #374151;
    }
    .footer {
      margin-top: 15mm;
      padding-top: 5mm;
      border-top: 1px solid #e5e7eb;
      font-size: 8pt;
      color: #6b7280;
      text-align: center;
    }
    .footer-links {
      margin-top: 2mm;
    }
    .footer-links a {
      color: #059669;
      text-decoration: none;
      margin: 0 2mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="title-main">
        Where <span class="creative">Creative Intuition</span> meets <span class="business">Business Intelligence</span>
      </div>
      <div class="date">${date}</div>
    </div>

    <div class="result-header">
      <div class="label">Your Result</div>
      <div class="result-title">${content.title}</div>
      <div class="result-headline">${content.headline}</div>
    </div>

    <div class="scores-container">
      <div class="label" style="margin-bottom: 4mm;">Your Scores</div>
      
      <div class="score-row">
        <div class="score-header">
          <span class="score-label creative">Creative Intuition</span>
          <span class="score-value">${scores.ci}/36 (${ciPercent}%)</span>
        </div>
        <div class="score-bar">
          <div class="score-fill creative" style="width: ${ciPercent}%"></div>
        </div>
      </div>

      <div class="score-row">
        <div class="score-header">
          <span class="score-label business">Business Intelligence</span>
          <span class="score-value">${scores.bi}/36 (${biPercent}%)</span>
        </div>
        <div class="score-bar">
          <div class="score-fill business" style="width: ${biPercent}%"></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">What's Working</div>
      <div class="section-content">${content.working}</div>
    </div>

    <div class="section">
      <div class="section-title">Where Imbalance Shows Up</div>
      <div class="section-content">${content.imbalance}</div>
    </div>

    <div class="section">
      <div class="section-title">If Nothing Changes</div>
      <div class="section-content">${content.cost}</div>
    </div>

    <div class="section">
      <div class="section-title">Next Steps</div>
      <div class="section-content">${formattedHelp}</div>
    </div>

    <div class="footer">
      <div>Creative Intuition × Business Intelligence Diagnostic</div>
      <div class="footer-links">
        Design by <a href="https://www.linkedin.com/in/robynkeet/">Robyn Keet</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

export const generatePDF = (scores: Scores, content: ProfileContent) => {
  const html = getReportHTML(scores, content);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Small timeout to ensure styles load
    setTimeout(() => {
        printWindow.focus();
        printWindow.print();
    }, 250);
  } else {
    alert("Please allow pop-ups to generate the PDF report.");
  }
};
