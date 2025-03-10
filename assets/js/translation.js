document.addEventListener('DOMContentLoaded', function () {
    const dropdownButton = document.getElementById('language-menu-button');
    const languageOptions = document.getElementById('language-options');
    const currentLanguageText = document.getElementById('current-language');
    const languageLinks = document.querySelectorAll('[data-lang]');
    const translatableElements = document.querySelectorAll('[data-translate]');

    let translations = {};

    // Ensure dropdown button exists before adding event listener
    if (dropdownButton && languageOptions) {
        dropdownButton.addEventListener('click', function () {
            languageOptions.classList.toggle('hidden');
        });

        document.addEventListener('click', function (event) {
            if (!dropdownButton.contains(event.target) && !languageOptions.contains(event.target)) {
                languageOptions.classList.add('hidden');
            }
        });
    }

    async function fetchTranslations() {
        try {
            const response = await fetch('/pr0meth4us/assets/translations.json');
            translations = await response.json();

            const currentLang = localStorage.getItem('language') || 'en';
            updateLanguage(currentLang);
            updateLanguageDisplay(currentLang);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    function updateLanguage(lang) {
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        languageLinks.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('font-bold');
            } else {
                link.classList.remove('font-bold');
            }
        });

        localStorage.setItem('language', lang);
    }

    function updateLanguageDisplay(lang) {
        if (currentLanguageText) {
            currentLanguageText.textContent = lang.toUpperCase();
        }
    }

    languageLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            updateLanguage(selectedLang);
            updateLanguageDisplay(selectedLang);

            languageOptions.classList.add('hidden');
        });
    });

    fetchTranslations();
});
