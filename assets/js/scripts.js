document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const welcomeModal = document.getElementById('welcome-modal');
    const modalForm = document.getElementById('modal-form');
    const modalSkip = document.getElementById('modal-skip');

    if (welcomeModal && localStorage.getItem('modalShown') !== 'true') {
        console.log("Showing modal after delay");
        setTimeout(() => {
            welcomeModal.classList.remove('hidden');
        }, 1000);
    }

    const noButtons = document.querySelectorAll('.no-button');
    noButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input) {
                input.value = "Prefer not to say";
                input.disabled = true;
            }
        });
    });

    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('visitor-name').value;
            const organization = document.getElementById('visitor-organization').value;
            const telegramHandle = document.getElementById('telegram-handle').value;
            const reasonElement = document.querySelector('input[name="reason"]:checked');
            const reason = reasonElement ? reasonElement.value : 'Not provided';

            localStorage.setItem('modalShown', 'true');
            localStorage.setItem('visitorName', name);

            const formData = new FormData();
            formData.append('entry.279597109', name);
            formData.append('entry.1168413239', organization);
            formData.append('entry.1473708403', reason);
            formData.append('entry.901917649', telegramHandle);

            fetch('https://docs.google.com/forms/d/e/1FAIpQLScfYiEtg7dI3LSCzUPOFG4ilC1R7iBvMflsEynYwoUksrKuBQ/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
                .then(() => {
                    console.log("Form submitted to Google Forms");
                    welcomeModal.classList.add('hidden');
                })
                .catch(error => console.error("Error:", error));
        });
    }

    if (modalSkip) {
        modalSkip.addEventListener('click', function() {
            localStorage.setItem('modalShown', 'true');
            welcomeModal.classList.add('hidden');
        });
    }
});