document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('data/projects.json');
    const projects = await response.json();
    const projectsList = document.getElementById('projects-list');
    projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded shadow';
        div.innerHTML = `
            <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
            <p class="text-gray-700 mb-4">${project.description}</p>
            <div class="mb-4">${project.tech_stack.map(tech => `<span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${tech}</span>`).join('')}</div>
            <a href="${project.code_link}" target="_blank" class="text-gray-600 hover:text-gray-800 mr-4">Code</a>
            <a href="${project.demo_link}" target="_blank" class="text-gray-600 hover:text-gray-800">Demo</a>
        `;
        projectsList.appendChild(div);
    });
});