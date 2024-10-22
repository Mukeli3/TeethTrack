from flask import Blueprint, request, jsonify
from datetime import datetime
from ..models.appointment_model import Appointment


search_bp = Blueprint('appointments', __name__)

@search_bp.route('/appointments/search', methods=['GET'])
def search_appointments():
    start_time = request.args.get('start_time')
    end_time = request.args.get('end_time')

    try:
        # convert to datetime objects
        start_time = datetime.strptime(start_time, "%d-%m-%Y %H:%M:%S")
        end_time = datetime.strptime(end_time, "%d-%m-%Y %H:%M:%S")

    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400

    slots = appointment.search_slots(start_time, end_time)

    if not slots:
        return jsonify({'msg': 'Fully booked.'}), 404

    return jsonify([{
        'appointment_id': slot.appointment_id,
        'user_id': slot.user_id,
        'appointment': slot.appointment.strptime("%d-%m-%Y %H:%H:%S"),
        'status': slot.status
        } for slot in slots]), 200
