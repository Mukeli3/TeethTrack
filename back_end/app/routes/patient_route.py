from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Appointment, PatientRecords, User
from app import db

patient_bp = Blueprint('patient', __name__)

@patient_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def patient_dashboard():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role != 'patient':
        return jsonify({'error': 'Unauthorized access'}), 403

    # fetch patient-specific data
    appointments = Appointment.query.filter_by(user_id=current_id).all()
    records = PatientRecords.query.filter_by(user_id=current_id).all()

    # format the data
    appointments_data = [{'date': appt.appointment_date, 'status': appt.status} for appt in appointments]
    records_data = [{'date': rec.date, 'treatment': rec.treatment, 'notes': rec.notes} for rec in records]

    return jsonify({
        'success': True,
        'appointments': appointments_data,
        'records': records_data
    })

@patient_bp.route('/book_appointment', methods=['POST'])
@jwt_required()
def book_appointment():
    """
    user must be logged in and the role must be 'patient'
    """
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role != 'patient':
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    date = data.get('date')

    if not date:
        return jsonify({'error': 'Appointment date required'}), 400

    new = Appointment(
            user_id=current_id,
            date=date,
            status='scheduled'
            )
    db.session.add(new)
    db.session.commit()

    return jsonify({'msg': 'Appointment successfully booked'})

@patient_bp.route('/treatment_history', methods=['GET'])
@jwt_required
def view_history():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role != 'patient':
        return jsonify({'error': 'Unauthorized access'}), 403

    records = patient_records.query.filter_by(user_id=current_id).all()
    if not records:
        return jsonify({'msg': 'Treatment history not found'})

    treatment_history = [{'notes': record.notes, 'history': record.treatment_history} for record in records]

    return jsonify(treatment_history), 200


@patient_bp.route('/update_info', methods=['PUT'])
@jwt_required()
def update_personal_info():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role != 'patient':
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)

    db.session.commit()

    return jsonify({'msg': 'Personal details successfully updated'}), 200
