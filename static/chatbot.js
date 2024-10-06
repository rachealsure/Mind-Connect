// Function to send a message in the chatbot
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatbox = document.getElementById('chatbox');

    if (userInput.trim() !== '') {
        // Append user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('user-message');
        userMessage.textContent = userInput;
        chatbox.appendChild(userMessage);

        // Clear input field
        document.getElementById('user-input').value = '';

        // Send the user input to Flask backend (chatbot)
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            });

            const data = await response.json();
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = data.response; // Response from Flask
            chatbox.appendChild(botMessage);
            chatbox.scrollTop = chatbox.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Function to handle booking appointments
const bookButtons = document.querySelectorAll('.book-now-button');
bookButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const counselorName = event.target.closest('.counselor-item').querySelector('h3').textContent;

        alert(`You have selected ${counselorName} for an appointment. Please fill out the form below.`);
        document.getElementById('counselor').value = counselorName.toLowerCase().replace(/ /g, '-');
        window.location.href = '#appointments';

        // Send booking information to Flask backend
        const name = prompt("Enter your name:");
        const email = prompt("Enter your email:");
        const appointmentDate = prompt("Enter the appointment date (YYYY-MM-DD):");

        try {
            const response = await fetch('/api/book-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    counselor: counselorName,
                    name: name,
                    email: email,
                    date: appointmentDate
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Your appointment has been successfully booked!');
            } else {
                alert('Failed to book the appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while booking your appointment.');
        }
    });
});

