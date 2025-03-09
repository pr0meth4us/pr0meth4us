document.addEventListener('DOMContentLoaded', function () {
    const dropdownButton = document.getElementById('language-menu-button');
    const languageOptions = document.getElementById('language-options');
    const currentLanguageText = document.getElementById('current-language');
    const languageLinks = document.querySelectorAll('[data-lang]');

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const translatableElements = document.querySelectorAll('[data-translate]');

    let translations = {};

    dropdownButton.addEventListener('click', function() {
        const isOpen = languageOptions.classList.contains('hidden');
        if (isOpen) {
            languageOptions.classList.remove('hidden');
        } else {
            languageOptions.classList.add('hidden');
        }
    });

    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !languageOptions.contains(event.target)) {
            languageOptions.classList.add('hidden');
        }
    });

    /**
     * Fetches translations from the JSON file
     */
    async function fetchTranslations() {
        try {
            const response = await fetch('/assets/translations.json');
            translations = await response.json();

            // Set initial language from localStorage or default to English
            const currentLang = localStorage.getItem('language') || 'en';
            updateLanguage(currentLang);
            updateLanguageDisplay(currentLang);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    /**
     * Updates the text content of all translatable elements
     * @param {string} lang - The language code ('en' or 'kh')
     */
    function updateLanguage(lang) {
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update active state in dropdown
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
        currentLanguageText.textContent = lang.toUpperCase();
    }

    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            updateLanguage(selectedLang);
            updateLanguageDisplay(selectedLang);

            languageOptions.classList.add('hidden');
        });
    });

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    fetchTranslations();
});