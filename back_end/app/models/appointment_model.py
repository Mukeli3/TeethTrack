from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class appointment(db.Model):
    __tablename__ = 'appointment'
    appointment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    appointment = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False)
