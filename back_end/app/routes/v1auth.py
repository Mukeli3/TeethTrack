from flask import Blueprint, request, jsonify, render_template, url_for
from app.models.user_model import User
from app import db, jwt
import bcrypt  # password hashing
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt
from flask import current_app as app  # accessing app configs
import datetime
from functools import wraps

auth = Blueprint('auth', __name__)

blacklist = set()

def required(f):  # helper function to require JWT tokens
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

    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    role = request.form.get('role')

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'patient')  # default role

    if not email or not password:
        return jsonify({'msg': 'Missing email or password'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'msg': 'User already exists'}), 409

    # use bcrypt, hash password
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(email=email, password=hashed)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg': 'User successfully registered'}), 201

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        render_template('login.html')

    email = request.form.get('email')
    password = request.form.get('password')
    # print("Form Data Received")
    # print(request.headers)

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'msg': 'User not found'}), 404

    if not bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({'msg': 'Invalid password'}), 401

    # generate JWT token
    token = create_access_token(identity={'user_id': user.id, 'role': user.role}, expires_delta=datetime.timedelta(hours=1))

    return jsonify({'token': token})

# logout the user, invalidate tokens client-side
@auth.route('/logout', methods=['GET', 'POST'])
@required
def logout(current):
    if request.method == 'GET':
        return redirect(url_for('auth.index'))

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
