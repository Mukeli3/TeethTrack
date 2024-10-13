from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    # relationship - One-to-Many
    appointments = db.relationship('appointment', backref='user', lazy=True)
