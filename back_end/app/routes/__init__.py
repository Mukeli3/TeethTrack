from .auth import auth_bp
from .patient_route import patient_bp
from .dentist_route import dentist_bp
from .billing_route import billing_bp

__all__ = ['auth_bp', 'patient_bp', 'dentist_bp', 'billing_bp']
