# -*- coding: utf-8 -*-
"""
Script de test simple pour SMART-EXCEL
"""

print("=" * 50)
print("SMART-EXCEL - Test du Backend")
print("=" * 50)

# Test 1: Imports de base
print("\n[TEST 1] Imports de base...")
try:
    from flask import Flask
    print("OK - Flask importe")
except ImportError as e:
    print(f"ERREUR - Flask: {e}")

try:
    from flask_cors import CORS
    print("OK - Flask-CORS importe")
except ImportError as e:
    print(f"ERREUR - Flask-CORS: {e}")

try:
    import pandas as pd
    print("OK - Pandas importe")
except ImportError as e:
    print(f"ERREUR - Pandas: {e}")

try:
    import openpyxl
    print("OK - OpenPyXL importe")
except ImportError as e:
    print(f"ERREUR - OpenPyXL: {e}")

# Test 2: Import du backend
print("\n[TEST 2] Import du backend...")
try:
    import os
    import sys
    
    # Aller dans le dossier backend
    backend_path = os.path.join(os.getcwd(), 'backend')
    sys.path.insert(0, backend_path)
    
    from app import app
    print("OK - Backend importe sans erreur")
    print(f"OK - Flask app cree: {type(app)}")
    
except Exception as e:
    print(f"ERREUR - Backend: {e}")

print("\n" + "=" * 50)
print("Test termine!")
print("=" * 50)
