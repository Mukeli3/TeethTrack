from flask import Blueprint, render_template, jsonify
from ..models.appointment_model import appointment
from ..models.billing_model import billing_table
from ..models.user_model import User

dashboard_bp = Blueprint('dashboard_bp', __name__)

@dashboard_bp.route('/dentist/dashboard', methods=['GET'])
def dentist_dashboard():
    # fetch appointments for the dentist
    appts = appointment.query.filter_by(status='confirmed').all()
    # fetcg payment records
    payments = appointment.query.filter_by(status='paid').all()

    return render_template(
            'dashboard.html',
            appointments=appointments,
            payments=payments,
            )
