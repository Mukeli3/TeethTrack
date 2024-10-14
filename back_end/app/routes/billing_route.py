from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import billing_table, appointment, User
from app import db

billing_bp = Blueprint('billing', __name__)

@billing_bp.route('/view_bills', methods=['GET'])
@jwt_required()
def view_bils():
    """
    user must be logged in
    """
    current_id = get_jwt_identity()
    bills = Billing.query.filter_by(user_id=current_id).all()

    if not bills:
        return jsonify({'msg': 'No billing records found'}), 404

    records = [{
        'billing_id': bill.id,
        'amt': bill.amt,
        'status': bill.status,
        'date': bill.date
        } for bill in bills]

    return jsonify(records), 200

@billing_bp.route('/pay_bill/<int:billing_id>', methods=['POST'])
@jwt_required()
def pay_bill(billing_id):
    current_id = get_jwt_identity()
    bill = Billing.query.get(billing_id)

    if not bill or bill.user_id != current_id:
        return jsonify({'error': 'Billing record not found'}), 404

    if bill.status == 'paid':
        return jsonify({'msg': 'The bill is already paid'}), 400

    bill.status = 'paid'
    db.session.commit()

    return jsonify({'msg': 'Bill successfully paid'}), 200

@billing_bp.route('/update_billing', methods=['PUT'])
@jwt_required()
def update_billing():
    """
    Authorized users only, admin or dentist, change status
    """
    current_id = get_jwt_identity()
    user = User.query.get(current_id)

    if user.role not in ['dentist', 'admin']:
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.get_json()
    billing_id = data.get('billing_id')
    status = data.get('status', None)
    amt = data.get('amt', None)

    bill = Billing.query.get(billing_id)

    if not bill:
        return jsonify({'error': 'Billing record not found'}), 404

    if status:
        bill.status = status
    if amt:
        bill.amt = amt

    db.session.commit()

    return jsonify({'msg': 'Billing record successfully updated'}), 200
