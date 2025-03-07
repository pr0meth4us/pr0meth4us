document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('data/about.json');
    const data = await response.json();
    document.getElementById('about-photo').src = data.photo_url;
    document.getElementById('about-bio').textContent = data.bio;
    const skillsDiv = document.getElementById('about-skills');
    data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2';
        span.textContent = skill;
        skillsDiv.appendChild(span);
    });
    const socialsDiv = document.getElementById('about-socials');
    data.socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.target = '_blank';
        a.className = 'text-gray-600 hover:text-gray-800';
        a.textContent = social.name;
        socialsDiv.appendChild(a);
    });
});