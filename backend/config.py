# -*- coding: utf-8 -*-
"""
Configuration pour l'application SMART-EXCEL
"""

import os

class Config:
    """Configuration de base"""
    
    # Configuration Flask
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'smart-excel-secret-key-dev'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    
    # Configuration des dossiers
    UPLOAD_FOLDER = 'uploads'
    EXPORT_FOLDER = 'exports'
    
    # Configuration OpenAI
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY') or 'your-openai-api-key-here'
    
    # Configuration CORS
    CORS_ORIGINS = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://192.168.1.100:3000'  # Pour mobile
    ]

class DevelopmentConfig(Config):
    """Configuration de développement"""
    DEBUG = True
    FLASK_ENV = 'development'

class ProductionConfig(Config):
    """Configuration de production"""
    DEBUG = False
    FLASK_ENV = 'production'

# Configuration par défaut
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
