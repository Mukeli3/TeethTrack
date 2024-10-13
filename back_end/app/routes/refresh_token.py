from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, create_refresh_token
from flask_jwt_extended import get_jwt_identity



refresh_bp = Blueprint('refresh', __name__)

@refresh_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_id = get_jwt_identity()
    new = create_refresh_token(identity=current_id)

    return jsonify({'token': new}), 200
