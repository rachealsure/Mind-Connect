from app import app, db

# Create the database tables
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")