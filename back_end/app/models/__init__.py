from app import  db
from .user_model import User
from .appointment_model import Appointment
from .patient_model import PatientRecords
from .billing_model import Billing


__all__ = ['User', 'Appointment', 'PatientRecords', 'Billing']
