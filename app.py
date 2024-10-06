import openai
from flask import Flask, request, jsonify,render_template,redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_cors import CORS  
import openai
# In Python interactive shell or script
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Lifelineray123@localhost/mindconnect'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# Initialize CORS
CORS(app)

# Set the secret key
app.secret_key = secrets.token_hex(32)

# Set your OpenAI API key here
openai.api_key = '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'

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Test database connection
def test_db_connection():
    try:
        with app.app_context():
            db.engine.connect()
            print("Successfully connected to the database!")
            return True
    except Exception as e:
        print(f"Database connection failed: {str(e)}")
        return False

### Database Models ###
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    appointment_date = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')  # Registration/Login page

# Route to serve the homepage
@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        user_exists = User.query.filter_by(email=email).first()
        if user_exists:
            flash('Email is already registered', 'danger')
            return redirect(url_for('register'))

        new_user = User(username=username, email=email, password=generate_password_hash(password))
        db.session.add(new_user)
        db.session.commit()
        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('homepage.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('homepage'))
        else:
            flash('Login failed. Check email or password.', 'danger')
    return render_template('homepage.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/homepage', methods=['GET', 'POST'])
@login_required
def homepage():
    if request.method == 'POST':
        appointment_date = request.form.get('appointment_date')
        description = request.form.get('description')

        new_appointment = Appointment(user_id=current_user.id, appointment_date=appointment_date, description=description)
        db.session.add(new_appointment)
        db.session.commit()
        flash('Appointment booked successfully!', 'success')
        appointments = Appointment.query.filter_by(user_id=current_user.id).all()
    return render_template('homepage.html', appointments=appointments)\

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
        print(f"Error: {e}")  # Optionally print the error for debugging
        return "Sorry, I'm having trouble processing your request right now. Please try again later."

      

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

@app.route('/api/book-appointment', methods=['POST'])
def book_appointment():
    data = request.json
    counselor = data.get('counselor')
    name = data.get('name')
    email = data.get('email')
    date = data.get('date')

    if counselor and name and email and date:
        return jsonify({'success': True, 'message': 'Appointment booked successfully!'})
    else:
        return jsonify({'success': False, 'message': 'Failed to book appointment.'}), 400

if __name__ == '__main__':
      with app.app_context():
        db.create_all()
app.run(port=5500, debug=True)
    
