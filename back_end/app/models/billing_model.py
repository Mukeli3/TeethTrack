from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class billing_table(db.Model):
    __tablename__ = 'billing_table'
    billing_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.appointment_id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='billing', lazy=True)
    appointment= db.relationship('appointment', backref='billing_table', lazy=True)
