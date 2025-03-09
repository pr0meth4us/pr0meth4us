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

    console.log("Modal element found:", !!welcomeModal);
    console.log("localStorage modalShown value:", localStorage.getItem('modalShown'));

    if (welcomeModal && localStorage.getItem('modalShown') !== 'true') {
        console.log("Showing modal after delay");
        setTimeout(() => {
            welcomeModal.classList.remove('hidden');
        }, 1000);
    } else {
        console.log("Modal will not be shown - already seen or element not found");
    }

    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('visitor-name').value;
            const telegramHandle = document.getElementById('telegram-handle').value;
            const reasonElement = document.querySelector('input[name="reason"]:checked');

            if (!reasonElement) {
                alert("Please select a reason for your visit.");
                return;
            }

            const reason = reasonElement.value;

            localStorage.setItem('modalShown', 'true');
            localStorage.setItem('visitorName', name);

            const message = `New visitor submission:\nName: ${name}\nReason: ${reason}\nTelegram: ${telegramHandle}`;

            const botToken = window.env && window.env.BOT_TOKEN;
            const chatId = window.env && window.env.CHAT_ID;

            if (botToken && chatId) {
                console.log("Sending message to Telegram...");
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
                console.log("window.env:", window.env);
                alert("Telegram configuration is missing.");
            }

            welcomeModal.classList.add('hidden');
        });
    }

    if (modalSkip) {
        modalSkip.addEventListener('click', function() {
            localStorage.setItem('modalShown', 'true');
            welcomeModal.classList.add('hidden');
        });
    }
});