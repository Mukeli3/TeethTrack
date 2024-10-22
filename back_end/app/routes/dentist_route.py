from flask import Blueprint, request, jsonify
from app.models import Appointment, PatientRecords, User
from app import db

dentist_bp = Blueprint('dentist', __name__)

@dentist_bp.route('/dashboard', methods=['GET'])
# @jwt_required()  # Removed for testing without JWT
def dentist_dashboard():
    # Simulating user as a dentist for testing (replace with actual user fetching logic later)
    user = User.query.filter_by(role='dentist').first()  # Fetch the first dentist user for testing

    if not user:
        return jsonify({'error': 'No dentist found for testing'}), 403

    # Fetch payment records (assuming there's a field called `status` in appointments)
    payments = Appointment.query.filter_by(status='paid').all()

    # Fetch dentist-specific data
    appointments = Appointment.query.filter_by(dentist_id=user.id).all()
    patient_records = PatientRecords.query.filter_by(dentist_id=user.id).all()

    # Format the data
    appointments_data = [{'date': appt.appointment_date, 'patient': appt.patient.name, 'status': appt.status} for appt in appointments]
    records_data = [{'date': rec.date, 'patient': rec.patient.name, 'notes': rec.notes} for rec in patient_records]

    return jsonify({
        'success': True,
        'appointments': appointments_data,
        'records': records_data,
        'payments': payments
    })

@dentist_bp.route('/view_appointments', methods=['GET'])
# @jwt_required()  # Removed for testing without JWT
def view_appointments():
    """
    Simulating user as a dentist for testing
    """
    user = User.query.filter_by(role='dentist').first()  # Fetch the first dentist user for testing

    if not user:
        return jsonify({'error': 'No dentist found for testing'}), 403

    appointments = Appointment.query.filter_by(status='scheduled').all()
    appt_list = [{'appointment_id': appt.id, 'date': appt.appointment_date, 'user_id': appt.user_id} for appt in appointments]

    return jsonify(appt_list), 200

@dentist_bp.route('/update_record', methods=['PUT'])
# @jwt_required()  # Removed for testing without JWT
def update_record():
    user = User.query.filter_by(role='dentist').first()  # Simulating user as a dentist

    if not user:
        return jsonify({'error': 'No dentist found for testing'}), 403

    data = request.get_json()
    patient_id = data.get('patient_id')
    notes = data.get('notes')
    history = data.get('history')

    record = PatientRecords.query.filter_by(user_id=patient_id).first()

    if record:
        record.notes = notes
        record.history = history
        db.session.commit()

        return jsonify({'msg': 'Patient record successfully updated'}), 200
    else:
        return jsonify({'error': 'Record not found'}), 404

@dentist_bp.route('/add_notes', methods=['POST'])
# @jwt_required()  # Removed for testing without JWT
def add_notes():
    user = User.query.filter_by(role='dentist').first()  # Simulating user as 
