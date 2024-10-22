#!/usr/bin/python3

import os

class Config:
    """
    base configuration class containing default settings
    """
    # session and JWT secret key
    SECRET_KEY = os.environ.get('SECRET_KEY')

    # db configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    
    # significant overhead silence warning for tracking modifications
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    JWT_HEADER_TYPE = 'Bearer'

    DEBUG = False
    TESTING = False
    ENV = 'production'


class DevelopmentConfig(Config):
    """
    development environment configuration
    """
    DEBUG = True
    ENV = 'development'


class TestingConfig(Config):
    """
    testing environment configuration
    """
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'  # Use in-memory database for testing


class ProductionConfig(Config):
    """
    production environment config
    """
    DEBUG = False
    ENV = 'production'
