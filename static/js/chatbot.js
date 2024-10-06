function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    const chatbox = document.getElementById('chatbox');

    // Append user message to chatbox
    chatbox.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Send message to Flask backend
    fetch('/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        // Append bot's reply to chatbox
        chatbox.innerHTML += `<div><strong>Bot:</strong> ${data.reply}</div>`;
    });
}



