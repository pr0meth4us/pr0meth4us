document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Welcome modal functionality
    const welcomeModal = document.getElementById('welcome-modal');
    const modalForm = document.getElementById('modal-form');
    const modalSkip = document.getElementById('modal-skip');

    // Show modal on first visit (using localStorage)
    if (welcomeModal && !localStorage.getItem('modalShown')) {
        setTimeout(() => {
            welcomeModal.classList.remove('hidden');
        }, 1000);
    }

    // Close modal when form is submitted
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('visitor-name').value;
            const telegramHandle = document.getElementById('telegram-handle').value;
            const reason = document.querySelector('input[name="reason"]:checked').value;

            // Save to localStorage that user has seen the modal
            localStorage.setItem('modalShown', 'true');
            localStorage.setItem('visitorName', name);

            // Compose the Telegram message
            const message = `New visitor submission:\nName: ${name}\nReason: ${reason}\nTelegram: ${telegramHandle}`;

            const botToken = window.env && window.env.BOT_TOKEN;
            const chatId = window.env && window.env.CHAT_ID;

            if (botToken && chatId) {
                fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Telegram response:", data);
                        alert("Form submitted! Your message was sent to Telegram.");
                    })
                    .catch(err => {
                        console.error("Error sending Telegram message:", err);
                        alert("There was an error sending your message.");
                    });
            } else {
                console.error("Bot token or chat ID is not defined in window.env.");
                alert("Telegram configuration is missing.");
            }

            welcomeModal.classList.add('hidden');
        });
    }

    // Skip button closes modal
    if (modalSkip) {
        modalSkip.addEventListener('click', function() {
            localStorage.setItem('modalShown', 'true');
            welcomeModal.classList.add('hidden');
        });
    }
});
