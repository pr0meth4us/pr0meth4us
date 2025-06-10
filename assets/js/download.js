document.getElementById('download-pdf').addEventListener('click', () => {
const element = document.getElementById('cv-content');
html2pdf()
  .set({
    margin:       10,
    filename:     '{{ site.title | slugify }}-CV.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  })
  .from(element)
  .save();
});