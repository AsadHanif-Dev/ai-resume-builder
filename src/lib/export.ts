import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Export resume to PDF with improved quality
 * Uses html2canvas to capture the preview and jsPDF to generate PDF
 */
export async function exportToPdf(element: HTMLElement, filename = 'resume.pdf') {
  try {
    // Capture with high resolution
    const canvas = await html2canvas(element, { 
      scale: 3, // Higher scale for better quality
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 850, // Standard letter width in pixels
      windowHeight: 1100 // Standard letter height in pixels
    })
    
    const imgData = canvas.toDataURL('image/png', 1.0)
    
    // Create PDF with proper A4/Letter dimensions
    const pdf = new jsPDF({ 
      format: 'letter',
      unit: 'in',
      orientation: 'portrait'
    })
    
    const imgProps = pdf.getImageProperties(imgData)
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Calculate dimensions to fit page while maintaining aspect ratio
    const imgWidth = pageWidth
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width
    
    // If content is longer than one page, add multiple pages
    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight
      let position = 0
      
      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position -= pageHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
        heightLeft -= pageHeight
      }
    } else {
      // Single page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST')
    }
    
    pdf.save(filename)
    return true
  } catch (error) {
    console.error('PDF export failed:', error)
    throw new Error('Failed to export PDF. Please try again.')
  }
}
