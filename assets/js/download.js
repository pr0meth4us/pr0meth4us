document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, looking for download button...');

    const downloadBtn = document.getElementById('download-pdf');
    const cvContent = document.getElementById('cv-content');

    console.log('Download button found:', downloadBtn);
    console.log('CV content found:', cvContent);
    console.log('html2pdf available:', typeof html2pdf !== 'undefined');

    if (downloadBtn && cvContent) {
        downloadBtn.addEventListener('click', function() {
            console.log('Download button clicked');

            // Show loading state
            const originalContent = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<span class="animate-pulse">Generating PDF...</span>';
            downloadBtn.disabled = true;

            // Clone the content and remove the download buttons for PDF
            const clonedContent = cvContent.cloneNode(true);
            const buttonsToRemove = clonedContent.querySelectorAll('#download-pdf, .text-center:last-child');
            buttonsToRemove.forEach(btn => btn.remove());

            html2pdf()
                .set({
                    margin: 15,
                    filename: '{{ site.title | slugify | default: "CV" }}-CV.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        letterRendering: true,
                        allowTaint: false
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a4',
                        orientation: 'portrait'
                    },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                })
                .from(clonedContent)
                .save()
                .then(() => {
                    console.log('PDF generated successfully');
                    // Reset button state
                    downloadBtn.innerHTML = originalContent;
                    downloadBtn.disabled = false;
                })
                .catch((error) => {
                    console.error('Error generating PDF:', error);
                    alert('Error generating PDF. Please try again or use the pre-made downloads below.');
                    // Reset button state
                    downloadBtn.innerHTML = originalContent;
                    downloadBtn.disabled = false;
                });
        });
    } else {
        console.error('Required elements not found:', {
            downloadBtn: !!downloadBtn,
            cvContent: !!cvContent
        });
    }
});