import React from 'react';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';

const removeEmojis = (text) =>
  text.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}]/gu, '');

const ExportButtons = ({ ideas }) => {
  const handleCopyAll = () => {
    if (!ideas.length) {
      toast.error('❗ Nothing to copy.');
      return;
    }

    const content = ideas.map(({ idea, steps }) =>
      `💡 ${idea}\n${steps.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}`
    ).join('\n\n');

    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const handleExportPDF = () => {
    if (!ideas.length) {
      toast.error('❗ No ideas to export.');
      return;
    }

    const doc = new jsPDF();
    let y = 10;

    ideas.forEach(({ idea, steps }, index) => {
      doc.setFontSize(14);
      doc.text(removeEmojis(`${index + 1}. ${idea}`), 10, y);
      y += 8;

      doc.setFontSize(11);
      steps.forEach((step, i) => {
        const cleanStep = removeEmojis(`${i + 1}. ${step}`);
        const lines = doc.splitTextToSize(cleanStep, 180);
        lines.forEach(line => {
          doc.text(line, 14, y);
          y += 6;
          if (y > 280) {
            doc.addPage();
            y = 10;
          }
        });
        y += 4;
      });

      y += 10;
    });

    doc.save('PostIdeas.pdf');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        onClick={handleCopyAll}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        Copy All
      </button>
      <button
        onClick={handleExportPDF}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
