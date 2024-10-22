from flask import Blueprint, request, jsonify, current_app
from flask import render_template, url_for, redirect, flash
from app.models.user_model import User
from app import db, jwt
import bcrypt  # password hashing
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from flask import current_app as app  # accessing app configs
import datetime
from functools import wraps
from flask_login import login_required

auth = Blueprint('auth', __name__)

blacklist = set()

# Helper function to require JWT tokens
def required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-tokens')
        if not token:
            return jsonify({'message': 'Missing Token'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current = User.query.filter_by(id=data['user_id']).first()
        except Exception as e:
            return jsonify({'message': 'Invalid Token'}), 401
 
        return f(current, *args, **kwargs)  # current user

    return decorated

@auth.route("/")
def index():
    return render_template('index.html')

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')

    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        role = request.form.get('role', 'patient')  # default to 'patient' if role is not provided

        if not email or not password:
            flash('Missing email or password', 'error')
            return redirect(url_for('auth.register'))

        if User.query.filter_by(email=email).first():
            flash('User already exists', 'error')
            return redirect(url_for('auth.register'))
        # use bcrypt, hash password
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = User(name=name, email=email, password=hashed.decode('utf-8'), role=role)
        db.session.add(new_user)
        db.session.commit()

        flash('Registration successfull! Please log in.', 'success')
        return redirect(url_for('auth.login'))

@auth.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    current_app.logger.info(f"Login attempt for email: {email}")

    if not email or not password:
        current_app.logger.warning("Login attempt with missing email or password")
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        try:
            if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                access_token = create_access_token(identity={"user_id": user.user_id, "role": user.role})
                current_app.logger.info(f"Successful login for email: {email}")
                return jsonify({"message": "Login successful", "token": access_token, "user": {"role": user.role}}), 200
            else:
                current_app.logger.warning(f"Invalid password for email: {email}")
                return jsonify({"error": "Invalid email or password"}), 401
        except Exception as e:
            current_app.logger.error(f"Error during password check: {str(e)}")
            return jsonify({"error": "An error occurred during login"}), 500
    else:
        current_app.logger.warning(f"User not found for email: {email}")
        return jsonify({"error": "Invalid email or password"}), 401

@auth.route('/dashboard', methods=['GET'])
@login_required
def user_dashboard():
    current_user_id = get_jwt_identity()  # Get the user ID from the JWT token
    user = User.query.get(current_user_id)  # Fetch the full user object from the database

    if user is None:
        return redirect(url_for('auth.login'))  # Redirect if user does not exist

    # Access user properties
    if user.role.lower() == 'dentist':
        return redirect(url_for('auth.dentist_dashboard'))
    elif user.role.lower() == 'patient':
        return redirect(url_for('auth.patient_dashboard'))
    else:
        return redirect(url_for('auth.login'))

@auth.route('/dentist_dashboard', methods=['GET'])
# @jwt_required()
def dentist_dashboard():
    """ current_user_id = get_jwt_identity()  # Get the user ID from the JWT token
    user = User.query.get(current_user_id)  # Fetch the full user object from the database

    if user is None:
        return redirect(url_for('auth.login'))  # Redirect if user does not exist

    current_app.logger.info(f"Accessing dentist dashboard for user: {user.username}") """
    return render_template('dentist_dashboard.html')

@auth.route('/patient_dashboard', methods=['GET'])
# @jwt_required()
def patient_dashboard():
    """ current_identity = get_jwt_identity()  # Get the user identity from the JWT token
    role = current_identity.get('role')    # Extract the role from the JWT token

    user = User.query.filter_by(role=role).first()  # Fetch the user based on the role

    if user is None:
        return redirect(url_for('auth.login'))  # Redirect if user does not exist

    current_app.logger.info(f"Accessing patient dashboard for user: {user.username}") """
    return render_template('patient_dashboard.html')

@auth.route('/logout', methods=['POST'])
@required
def logout(current):
    jti = get_jwt()['jti']  # JWT ID (token unique identifier)
    blacklist.add(jti)  # add to blacklist, token's jti
    return jsonify({'msg': 'Successfully logged out'}), 200

# add a callback to check if the token is in the blacklist
@jwt.token_in_blocklist_loader
def check_revoked(jwt_header, jwt_payload):
    """
    Callback function to check if a token is blacklisted (revoked).
    """
    jti = jwt_payload['jti']
    return jti in blacklist  # returns True if the token's jti is in the blacklist
