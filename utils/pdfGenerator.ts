import { Scores, ProfileContent } from '../types';

export const getReportHTML = (scores: Scores, content: ProfileContent) => {
  const ciPercent = Math.round((scores.ci / (36 || 1)) * 100);
  const biPercent = Math.round((scores.bi / (36 || 1)) * 100);
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedHelp = content.help.replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Creative Diagnostic Results - ${date}</title>
  <style>
    /* simplified print styles for PDF */
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#111827; }
    .page { padding: 20mm; }
    .title { font-size: 18pt; font-weight: 700; margin-bottom: 6mm; }
    .section { margin-bottom: 6mm; }
    .label { font-weight: 600; color:#6b7280; }
  </style>
</head>
<body>
  <div class="page">
    <div class="title">${content.title}</div>
    <div class="section"><div class="label">Headline</div><div>${content.headline}</div></div>
    <div class="section"><div class="label">Scores</div><div>CI: ${scores.ci} (${ciPercent}%) — BI: ${scores.bi} (${biPercent}%)</div></div>
    <div class="section"><div class="label">What's Working</div><div>${content.working}</div></div>
    <div class="section"><div class="label">Where Imbalance Shows Up</div><div>${content.imbalance}</div></div>
    <div class="section"><div class="label">Next Steps</div><div>${formattedHelp}</div></div>
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
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  } else {
    alert('Please allow pop-ups to generate the PDF report.');
  }
};
