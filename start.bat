@echo off
echo ========================================
echo    Excel AI Editor - Demarrage Rapide
echo ========================================
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Python n'est pas installe ou pas dans le PATH
    echo Veuillez installer Python 3.8+ depuis https://python.org
    pause
    exit /b 1
)

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Node.js n'est pas installe ou pas dans le PATH
    echo Veuillez installer Node.js 16+ depuis https://nodejs.org
    pause
    exit /b 1
)

echo [INFO] Verification des prerequis... OK
echo.

REM Créer les dossiers nécessaires
if not exist "backend\uploads" mkdir backend\uploads
if not exist "backend\exports" mkdir backend\exports

echo [INFO] Dossiers crees
echo.

REM Démarrer le backend en arrière-plan
echo [INFO] Demarrage du backend Flask...
cd backend

REM Vérifier si l'environnement virtuel existe
if not exist "venv" (
    echo [INFO] Creation de l'environnement virtuel Python...
    python -m venv venv
)

REM Activer l'environnement virtuel
call venv\Scripts\activate

REM Installer les dépendances si nécessaire
if not exist "venv\Lib\site-packages\flask" (
    echo [INFO] Installation des dependances Python...
    pip install -r requirements.txt
)

REM Démarrer Flask en arrière-plan
echo [INFO] Lancement du serveur Flask sur http://localhost:5000
start /B python app.py

cd ..

REM Attendre que le backend soit prêt
echo [INFO] Attente du demarrage du backend...
timeout /t 3 /nobreak >nul

REM Démarrer le frontend
echo [INFO] Demarrage du frontend React...
cd frontend

REM Installer les dépendances si nécessaire
if not exist "node_modules" (
    echo [INFO] Installation des dependances Node.js...
    npm install
)

echo [INFO] Lancement du serveur React sur http://localhost:3000
echo.
echo ========================================
echo   Application prete !
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo ========================================
echo.
echo Appuyez sur Ctrl+C pour arreter les serveurs
echo.

REM Démarrer React (bloquant)
npm start

REM Si on arrive ici, React s'est arrêté
echo.
echo [INFO] Arret de l'application...
pause
