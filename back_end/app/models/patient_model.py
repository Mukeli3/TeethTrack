from datetime import datetime
from app import db

class PatientRecords(db.Model):
    __tablename__ = 'patient_records'
    record_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    treatment_history = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='records', lazy=True)
