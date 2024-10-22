from flask_login import UserMixin
from app import db


class User(UserMixin, db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    # relationship - One-to-Many
    patient_appointments = db.relationship('Appointment', foreign_keys='Appointment.user_id', backref='patient', lazy='select')
    dentist_appointments = db.relationship('Appointment', foreign_keys='Appointment.dentist_id', backref='dentist', lazy='select')
