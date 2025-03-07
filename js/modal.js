document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("welcome-modal");
    if (!modal) return; // Only run on index page

    // Check if modal has been shown before
    if (localStorage.getItem("modalShown")) {
        modal.classList.add("hidden");
        return;
    }

    // Show modal
    modal.classList.remove("hidden");

    const form = document.getElementById("modal-form");
    const skipButton = document.getElementById("modal-skip");

    // On skip
    skipButton.addEventListener("click", function() {
        localStorage.setItem("modalShown", "true");
        modal.classList.add("hidden");
    });

    // On submit
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("visitor-name").value;
        const reason = form.elements["reason"].value;
        const telegram = document.getElementById("telegram-handle").value;
        const formData = { name, reason, telegram };

        // Compose the message
        const message = `New visitor submission:\nName: ${name}\nReason: ${reason}\nTelegram: ${telegram}`;

        // Use injected config from config.js
        const botToken = window.env.BOT_TOKEN;
        const chatId = window.env.CHAT_ID;

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

        localStorage.setItem("modalShown", "true");
        modal.classList.add("hidden");
    });
});
