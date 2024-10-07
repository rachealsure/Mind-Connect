from flask import Flask, request, render_template, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os
from openai import OpenAI
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.template_folder = 'templates'
import os
from flask import Flask

app = Flask(__name__, static_folder='static')



# Configure secret key and database
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key-for-development')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Hampty2030@localhost/MindConnect'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
CORS(app)

# Test connection
try:
    with app.app_context():
        db.engine.connect()
        print("Database connection successful!")
except Exception as e:
    print(f"Database connection failed: {e}")


# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# User model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    chats = db.relationship('Chat', backref='user', lazy=True)

# Chat model
class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


app = Flask(__name__)

@app.route('/login', methods=['GET', 'POST'])
def login():  # Only one login function
    return render_template('login.html')

@app.route('/home', methods=['GET'])
def home():
    return render_template('home.html')



# Routes

@app.route('/')
def home():
    return render_template('homepage.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered', 'danger')
            return redirect(url_for('register'))
        
        if User.query.filter_by(username=username).first():
            flash('Username already taken', 'danger')
            return redirect(url_for('register'))
        
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password)
        
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful! Please login.', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            db.session.rollback()
            flash('An error occurred. Please try again.', 'danger')
            
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            flash('Logged in successfully!', 'success')
            next_page = request.args.get('next')
            return redirect(next_page or url_for('dashboard'))
        else:
            flash('Invalid email or password', 'danger')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('home'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/counselors')
def counselors():
    # logic to render the counselors page
    return render_template('counselors.html')


@app.route('/chat', methods=['POST'])
@login_required
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        
        assistant_response = completion.choices[0].message.content

        new_chat = Chat(
            user_id=current_user.id,
            message=user_message,
            response=assistant_response
        )
        db.session.add(new_chat)
        db.session.commit()

        return jsonify({
            'response': assistant_response,
            'success': True
        })

    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 500
    
@app.route('/chatbot', methods=['POST'])
@login_required
def chatbot():
    try:
        data = request.json
        user_message = data.get('message')
        
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        
        assistant_response = completion.choices[0].message.content

        new_chat = Chat(
            user_id=current_user.id,
            message=user_message,
            response=assistant_response
        )
        db.session.add(new_chat)
        db.session.commit()

        return jsonify({
            'response': assistant_response,
            'success': True
        })

    except Exception as e:
        print(f"Error in chatbot route: {str(e)}")
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/chat-interface')
@login_required
def chat_interface():
    return render_template('chat.html')

@app.route('/chat-history')
@login_required
def chat_history():
    chats = Chat.query.filter_by(user_id=current_user.id).order_by(Chat.timestamp.desc()).all()
    return render_template('chat_history.html', chats=chats)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
    # Start the Flask app
if __name__ == '__main__':
      with app.app_context():
        db.create_all()
app.run(port=3000, debug=True)