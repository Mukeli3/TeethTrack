from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Appointment, PatientRecords, User
from app import db


dentist_bp = Blueprint('dentist', __name__)

@dentist_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dentist_dashboard():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role != 'dentist':
        return jsonify({'error': 'Unauthorized access'}), 403

    # fetch payment records
    payments = appointment.query.filter_by(status='paid').all()

    # fetch dentist-specific data
    appointments = Appointment.query.filter_by(dentist_id=user.id).all()
    patient_records = PatientRecords.query.filter_by(dentist_id=user.id).all()

    # format the data
    appointments_data = [{'date': appt.appointment_date, 'patient': appt.patient.name, 'status': appt.status} for appt in appointments]
    records_data = [{'date': rec.date, 'patient': rec.patient.name, 'notes': rec.notes} for rec in patient_records]

    return jsonify({
        'success': True,
        'appointments': appointments_data,
        'records': records_data,
        'payments': payments
    })

@dentist_bp.route('/view_appointments', methods=['GET'])
@jwt_required()
def view_appointments():
    """
    user must be logged in and the role must be, dentist
    """
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role != 'dentist':
        return jsonify({'error': 'Unauthorized access'}), 403

    appointments = Appointment.query.filter_by(status='scheduled').all()
    appt_list = [{'appointment_id': appt.id, 'date': appt.appointment_date, 'user_id': appt.user_id} for appt in appointments]

    return jsonify(appt_list), 200

@dentist_bp.route('/update_record', methods=['PUT'])
@jwt_required()
def update_record():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role != 'dentist':
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    patient_id = data.get('patient_id')
    notes = data.get('notes')
    history = data.get('history')

    record = patient_records.query.filter_by(user_id=patient_id).first()

    if record:
        record.notes = notes
        record.history = history
        db.session.commit()

        return jsonify({'msg': 'Patient record successfully updated'}), 200
    else:
        return jsonify({'error': 'Record not found'}), 404

@dentist_bp.route('/add_notes', methods=['POST'])
@jwt_required()
def add_notes():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role!= dentist:
        return jsonify({'error', 'Unauthorized access'}), 403

    data = request.get_json()
    patient_id = data.get('patient_id')
    notes = data.get('notes')

    new = patient_records(
            user_id=patient_id,
            notes=notes,
            history='Initial treatment'
            )
    db.session.add(new)
    db.session.commit()

    return jsonify({'msg': 'Treatment notes successfully added'}), 201
