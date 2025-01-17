import { Component, createSignal, onMount } from 'solid-js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import MbrasLuxuryPresentation from '../components/Presentation';

const PdfGenerator: Component = () => {
  let contentRef: HTMLDivElement | undefined;
  const [isGenerating, setIsGenerating] = createSignal(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(contentRef!, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#0A0E17',
        logging: false,
        allowTaint: true,
        imageTimeout: 0,
      });

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const scaleFactor = pdfWidth / canvasWidth;
      const pageHeightInCanvasPx = pdfHeight / scaleFactor;

      let position = 0;

      while (position < canvasHeight) {
        if (position > 0) {
          pdf.addPage();
        }

        const sliceHeight = Math.min(pageHeightInCanvasPx, canvasHeight - position);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;

        const pageCtx = pageCanvas.getContext('2d');
        if (!pageCtx) throw new Error('Canvas context not found');

        pageCtx.drawImage(
          canvas,
          0,
          position,
          canvasWidth,
          sliceHeight,
          0,
          0,
          canvasWidth,
          sliceHeight
        );

        const pageData = pageCanvas.toDataURL('image/jpeg', 0.9);
        pdf.addImage(pageData, 'JPEG', 0, 0, pdfWidth, sliceHeight * scaleFactor);

        position += sliceHeight;
      }

      pdf.save('MBRAS-Luxury-Presentation.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-900 text-white font-sans text-xl leading-relaxed">
      <div class="w-full mx-auto mb-10 pt-8 text-center">
        <h2 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
          Apresentação MBRAS 2025
        </h2>

        <button
          onClick={generatePDF}
          disabled={isGenerating()}
          class="
            inline-block 
            py-3 px-6
            rounded-sm
            bg-emerald-700
            text-white
            hover:bg-emerald-600
            disabled:opacity-50
            transition-colors
            font-semibold
          "
        >
          {isGenerating() ? 'Generando Apresentação...' : 'Gerar Apresentação'}
        </button>
      </div>

      <div ref={contentRef}>
        <MbrasLuxuryPresentation />
      </div>
    </div>
  );
};

export default PdfGenerator;