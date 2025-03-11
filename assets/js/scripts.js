document.addEventListener('DOMContentLoaded', function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    document.addEventListener('click', function(event) {
        const isMenuButton = mobileMenuButton.contains(event.target);
        const isMenuContent = mobileMenu.contains(event.target);

        if (!isMenuButton && !isMenuContent && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    const mobileNavContainer = document.querySelector('.mobile-nav-container');
    if (mobileNavContainer) {
        mobileNavContainer.addEventListener('click', function(e) {
            const dropdownLink = e.target.closest('.nav-link');
            if (dropdownLink && dropdownLink.querySelector('.dropdown-arrow')) {
                e.preventDefault();

                const container = dropdownLink.closest('.dropdown-container');
                const content = container.querySelector('.dropdown-content');
                const arrow = dropdownLink.querySelector('.dropdown-arrow');

                document.querySelectorAll('.mobile-nav-container .dropdown-content.show').forEach(function(openContent) {
                    if (openContent !== content) {
                        openContent.classList.remove('show');
                        const openArrow = openContent.parentElement.querySelector('.dropdown-arrow');
                        if (openArrow) openArrow.classList.remove('rotate-180');
                    }
                });

                content.classList.toggle('show');
                arrow.classList.toggle('rotate-180');
            }
        });
    }
});