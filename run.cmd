@echo off
REM Script CMD simple pour démarrer SMART-EXCEL
REM Double-cliquez sur ce fichier pour lancer l'application

title SMART-EXCEL - Démarrage
color 0A

echo ========================================
echo    SMART-EXCEL - Lancement Rapide
echo ========================================
echo.

REM Vérifier Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Python non installé
    echo Téléchargez Python depuis https://python.org
    pause
    exit /b 1
)

REM Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js non installé
    echo Téléchargez Node.js depuis https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Prérequis vérifiés
echo.

REM Créer les dossiers
if not exist "backend\uploads" mkdir "backend\uploads"
if not exist "backend\exports" mkdir "backend\exports"

REM Aller dans backend
cd /d "%~dp0backend"

REM Créer l'environnement virtuel si nécessaire
if not exist "venv" (
    echo [INFO] Création environnement virtuel...
    python -m venv venv
)

REM Activer l'environnement virtuel
call venv\Scripts\activate.bat

REM Installer les dépendances si nécessaire
if not exist "venv\Lib\site-packages\flask" (
    echo [INFO] Installation dépendances Python...
    pip install -r requirements.txt
)

REM Démarrer Flask en arrière-plan
echo [INFO] Démarrage serveur Flask...
start /B python app.py

REM Retourner au dossier racine
cd ..

REM Attendre un peu
timeout /t 3 /nobreak >nul

REM Aller dans frontend
cd frontend

REM Installer les dépendances Node.js si nécessaire
if not exist "node_modules" (
    echo [INFO] Installation dépendances Node.js...
    npm install
)

echo.
echo ========================================
echo   Application disponible sur:
echo   http://localhost:3000
echo ========================================
echo.
echo Appuyez sur Ctrl+C pour arrêter
echo.

REM Démarrer React
npm start

echo.
echo Application arrêtée.
pause