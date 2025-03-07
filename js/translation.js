document.addEventListener("DOMContentLoaded", function() {
    let translations = {};
    let currentLang = localStorage.getItem("language") || "en";

    // Function to update translations on the page
    function updateTranslations() {
        document.querySelectorAll("[data-translate]").forEach(el => {
            const key = el.getAttribute("data-translate");
            if(translations[currentLang] && translations[currentLang][key]){
                el.textContent = translations[currentLang][key];
            }
        });
        // Update language button styles
        document.getElementById("lang-en").classList.toggle("font-bold", currentLang === "en");
        document.getElementById("lang-kh").classList.toggle("font-bold", currentLang === "km");
    }

    // Fetch translations YAML file
    fetch('data/translations.yaml')
        .then(response => response.text())
        .then(text => {
            translations = jsyaml.load(text);
            updateTranslations();
        })
        .catch(err => console.error("Error loading translations:", err));

    // Event listeners for language switcher
    document.getElementById("lang-en").addEventListener("click", function() {
        currentLang = "en";
        localStorage.setItem("language", currentLang);
        updateTranslations();
    });

    document.getElementById("lang-kh").addEventListener("click", function() {
        currentLang = "km";
        localStorage.setItem("language", currentLang);
        updateTranslations();
    });
});
