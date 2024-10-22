#!/usr/bin/python3
import os
from flask_cors import CORS
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate # automate db schema management
from flask_jwt_extended import JWTManager


load_dotenv()
db = SQLAlchemy() # instantiate SQLAlchemy
# manage user login sessions & restrict access to certain routes
login_manager = LoginManager()
jwt = JWTManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def create_app():
    """
    Function creates and configures the Flask app
    Returns:
         the configured flask app instancei
    """
    app = Flask(__name__, static_folder='static')
    #CORS(app)

    app.config.from_object('app.config.Config')
    db.init_app(app) # initialize SQLAlchemy with the app
    jwt.init_app(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_TOKEN_LOCATION'] = ['headers']


    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    migrate = Migrate(app, db) # initialize flask_migrate


    # Register blueprints (routes)
    from app.routes.auth import auth
    from app.routes.patient_route import patient_bp
    from app.routes.dentist_route import dentist_bp
    from app.routes.billing_route import billing_bp
    from app.routes.search_route import search_bp
    # from app.routes.dashboard_route import dashboard_bp

    app.register_blueprint(auth)
    app.register_blueprint(patient_bp)
    app.register_blueprint(dentist_bp)
    app.register_blueprint(billing_bp)
    app.register_blueprint(search_bp)
    # app.register_blueprint(dashboard_bp)

    with app.app_context():
        from app.models import User, Appointment, PatientRecords, Billing
        db.create_all() # create db tables

    return app
