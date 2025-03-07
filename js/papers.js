document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('data/papers.json');
    const papers = await response.json();
    const papersList = document.getElementById('papers-list');
    papers.forEach(paper => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3 class="text-xl font-semibold mb-2">${paper.title}</h3>
            <p class="text-gray-700 mb-4">${paper.abstract}</p>
            <a href="${paper.paper_link}" target="_blank" class="text-gray-600 hover:text-gray-800">Read Paper</a>
        `;
        papersList.appendChild(div);
    });
});