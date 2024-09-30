from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    bot_response = get_bot_response(user_input)
    return jsonify({'response': bot_response})

def get_bot_response(user_input):
    user_input = user_input.lower()
    
    if 'help' in user_input:
        return "I'm here to help! Please share what's on your mind."
    elif 'stress' in user_input:
        return "It's normal to feel stressed. Try to take deep breaths and talk to someone you trust."
    elif 'anxiety' in user_input:
        return "Anxiety can be tough. Have you tried grounding techniques or talking to a friend?"
    elif 'depression' in user_input:
        return "It's important to reach out for support if you're feeling depressed. You're not alone."
    elif 'thank you' in user_input:
        return "You're welcome! I'm here whenever you need to talk."
    else:
        return "I'm not sure how to respond to that. Can you tell me more?"

if __name__ == '__main__':
    app.run(debug=True)
