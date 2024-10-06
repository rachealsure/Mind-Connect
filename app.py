import openai
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy


# Initialize Flask app
app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = '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'

# Define a function to interact with OpenAI API
def get_openai_response(message):
    try:
        # Call OpenAI's GPT model
        response = openai.Completion.create(
            engine="text-davinci-003",  # GPT-3 model
            prompt=message,
            max_tokens=150,  # Limit on the response length
            temperature=0.7,  # Temperature for creativity
            n=1,  # Number of responses to generate
            stop=None,  # When to stop the generation (you can customize it)
        )
        
        # Extract the response text
        reply = response.choices[0].text.strip()
        return reply

    except Exception as e:
        return "Sorry, I'm having trouble processing your request right now. Please try again later."

# Define a route to handle incoming chatbot requests
@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_message = data.get('message')
    
    # Ensure there is a message
    if not user_message:
        return jsonify({'reply': "I didn't understand that. Could you rephrase it?"})
    
    # Get the AI response from OpenAI
    bot_reply = get_openai_response(user_message)
    
    return jsonify({'reply': bot_reply})

# Booking Appointment API
@app.route('/api/book-appointment', methods=['POST'])
def book_appointment():
    data = request.json
    counselor = data.get('counselor')
    name = data.get('name')
    email = data.get('email')
    date = data.get('date')

    # Logic to save the appointment to a database (mock response here)
    if counselor and name and email and date:
        return jsonify({'success': True, 'message': 'Appointment booked successfully!'})
    else:
        return jsonify({'success': False, 'message': 'Failed to book appointment.'}), 400

# Start the Flask app
if __name__ == '__main__':
    app.run(port=5500, debug=True)
    
