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
            const reason = reasonElement.value;

            localStorage.setItem('modalShown', 'true');
            localStorage.setItem('visitorName', name);

            const message = `New visitor submission:
Name: ${name}
Organization: ${organization}
Reason: ${reason}
Telegram: ${telegramHandle}`;
// pls dont hack this, i beg u. i dont want to use a server host
            const botToken = '7800025628:AAF99ms_RJhsVO5pPqXN_NbsYEZ9ncxa0LY';
            const chatId = '1836585300';

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