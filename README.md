# Mind-Connect
MindConnect is a mental health web application that connects individuals with mental health professionals. It offers resources for stress management, direct access to licensed counselors, and a chatbot for immediate support. MindConnect is designed to provide mental health services in areas experiencing social unrest, with a focus on trauma, anxiety, and stress management.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Counselor Directory**: Users can browse through available counselors based on their expertise.
- **Appointment Booking**: Users can book appointments with selected counselors.
- **Chatbot Support**: Offers immediate support and answers mental health-related queries via chatbot.
- **Resources Section**: Provides resources like stress management techniques, emergency contacts, and support groups.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Backend Integration**: Connects to a Flask-based API for chatbot interactions and appointment booking.

## Tech Stack

### Frontend:
- **HTML5**: Structure of the web pages.
- **CSS3**: Styling of the web pages.
- **JavaScript (Vanilla)**: Client-side functionality including chatbot and form submission.
  
### Backend:
- **Flask (Python)**: Provides API endpoints for chatbot functionality and appointment booking.
- **Flask-CORS**: Enables cross-origin requests between the frontend and backend.

## Installation

### Prerequisites
- Python 3.7+
- Flask
- A modern web browser

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/mindconnect.git
cd mindconnect
```

### 2. Install Backend Dependencies:
```bash
pip install flask flask-cors
```

### 3. Run the Flask Backend:
```bash
python app.py
```

By default, the Flask app will run at `http://127.0.0.1:3000`.

### 4. Open the `index.html` file in your browser:
Navigate to the frontend directory and open `index.html` in any browser:
```bash
cd frontend
```
Open `index.html` in a browser by double-clicking it or using a local server like `Live Server` in VSCode.

### 5. Access MindConnect:
Now, the app is accessible in your browser and connected to the Flask backend for appointment booking and chatbot interactions.

## Usage

### 1. **Browsing Counselors**:
Go to the **Counselors** section to view a list of licensed mental health professionals. Each counselor’s expertise is outlined, and users can book an appointment by clicking on the "Book Now" button.

### 2. **Booking an Appointment**:
Click on a counselor’s "Book Now" button to fill out a form with your name, email, and preferred appointment date. This information is sent to the Flask backend, which processes the booking request.

### 3. **Chatbot**:
Use the chatbot for instant support by typing in a message. The chatbot responds based on your query using the backend Flask service.

### 4. **Mental Health Resources**:
Access the **Resources** section to find guides on managing stress, mental health support groups, and emergency contacts for immediate help.

## API Endpoints

The Flask backend handles the following API requests:

### 1. `/api/chat`
- **Method**: POST
- **Description**: Sends user input to the backend chatbot and returns a response.
- **Payload**:
    ```json
    {
      "message": "Your message here"
    }
    ```
- **Response**:
    ```json
    {
      "response": "Chatbot's response message"
    }
    ```

### 2. `/api/book-appointment`
- **Method**: POST
- **Description**: Handles booking appointments with a selected counselor.
- **Payload**:
    ```json
    {
      "counselor": "counselor-name",
      "name": "user-name",
      "email": "user-email",
      "date": "appointment-date"
    }
    ```
- **Response**:
    ```json
    {
      "success": true,
      "message": "Appointment booked successfully!"
    }
    ```

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This `README.md` provides all essential information for developers and users to understand, install, and run the MindConnect application. You can modify it as needed based on specific project changes.