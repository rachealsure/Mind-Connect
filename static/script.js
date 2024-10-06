document.getElementById('send-btn').addEventListener('click', function() {
    let userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessage('You: ' + userInput);
        document.getElementById('user-input').value = '';

        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            addMessage('Bot: ' + data.response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

function addMessage(message) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += '<div>' + message + '</div>';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to the bottom
}