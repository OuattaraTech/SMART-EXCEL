#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de test pour vérifier que le backend SMART-EXCEL fonctionne correctement
"""

import sys
import os

def test_imports():
    """Test des imports nécessaires"""
    print("🧪 Test des imports...")
    
    try:
        from flask import Flask, request, jsonify, send_file
        print("✅ Flask importé avec succès")
    except ImportError as e:
        print(f"❌ Erreur Flask: {e}")
        return False
    
    try:
        from flask_cors import CORS
        print("✅ Flask-CORS importé avec succès")
    except ImportError as e:
        print(f"❌ Erreur Flask-CORS: {e}")
        return False
    
    try:
        import pandas as pd
        print("✅ Pandas importé avec succès")
    except ImportError as e:
        print(f"❌ Erreur Pandas: {e}")
        return False
    
    try:
        import numpy as np
        print("✅ NumPy importé avec succès")
    except ImportError as e:
        print(f"❌ Erreur NumPy: {e}")
        return False
    
    try:
        import openpyxl
        print("✅ OpenPyXL importé avec succès")
    except ImportError as e:
        print(f"❌ Erreur OpenPyXL: {e}")
        return False
    
    # Test optionnel OpenAI
    try:
        import openai
        print("✅ OpenAI importé avec succès (optionnel)")
    except ImportError:
        print("⚠️ OpenAI non installé (optionnel)")
    
    return True

def test_backend_startup():
    """Test du démarrage du backend"""
    print("\n🚀 Test du démarrage du backend...")
    
    try:
        # Changer vers le dossier backend
        backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
        if os.path.exists(backend_dir):
            os.chdir(backend_dir)
            print(f"✅ Dossier backend trouvé: {backend_dir}")
        else:
            print("❌ Dossier backend non trouvé")
            return False
        
        # Importer l'application
        sys.path.insert(0, '.')
        from app import app, excel_processor, ai_processor
        print("✅ Application Flask importée avec succès")
        
        # Test de configuration
        if app.config.get('MAX_CONTENT_LENGTH'):
            print("✅ Configuration Flask OK")
        
        # Test des processeurs
        if excel_processor and ai_processor:
            print("✅ Processeurs Excel et IA initialisés")
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur lors du démarrage: {e}")
        return False

def test_file_structure():
    """Test de la structure des fichiers"""
    print("\n📁 Test de la structure des fichiers...")
    
    required_files = [
        'backend/app.py',
        'backend/requirements.txt',
        'frontend/package.json',
        'frontend/src/App.js',
        'README.md'
    ]
    
    all_good = True
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path} manquant")
            all_good = False
    
    return all_good

def main():
    """Fonction principale de test"""
    print("=" * 50)
    print("🧪 SMART-EXCEL - Test du Backend")
    print("=" * 50)
    
    # Aller au dossier racine du projet
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    tests = [
        ("Structure des fichiers", test_file_structure),
        ("Imports Python", test_imports),
        ("Démarrage backend", test_backend_startup),
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{'=' * 20} {test_name} {'=' * 20}")
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ Erreur inattendue dans {test_name}: {e}")
            results.append((test_name, False))
    
    # Résumé
    print("\n" + "=" * 50)
    print("📊 RÉSUMÉ DES TESTS")
    print("=" * 50)
    
    all_passed = True
    for test_name, passed in results:
        status = "✅ PASSÉ" if passed else "❌ ÉCHOUÉ"
        print(f"{test_name}: {status}")
        if not passed:
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 TOUS LES TESTS SONT PASSÉS !")
        print("Votre backend SMART-EXCEL est prêt à fonctionner.")
    else:
        print("⚠️ CERTAINS TESTS ONT ÉCHOUÉ")
        print("Vérifiez les erreurs ci-dessus et installez les dépendances manquantes.")
    print("=" * 50)
    
    return all_passed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
