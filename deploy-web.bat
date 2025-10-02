@echo off
REM Script de déploiement web automatique SMART-EXCEL

title SMART-EXCEL - Déploiement Web
color 0B

echo ========================================
echo     DÉPLOIEMENT WEB - SMART-EXCEL
echo ========================================
echo.

echo [INFO] Préparation du déploiement...
echo.

REM Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js requis ! Installez depuis https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js détecté
echo.

echo [ÉTAPE 1] Installation des CLI de déploiement...
echo.

REM Installer Railway CLI
echo [INFO] Installation Railway CLI...
npm install -g @railway/cli

REM Installer Vercel CLI  
echo [INFO] Installation Vercel CLI...
npm install -g vercel

echo.
echo [ÉTAPE 2] Préparation du backend...
echo.

REM Créer .env.example pour le backend
echo [INFO] Création fichier .env pour le backend...
echo FLASK_ENV=production > backend\.env.example
echo OPENAI_API_KEY=your-openai-api-key >> backend\.env.example
echo CORS_ORIGINS=https://your-frontend-domain.vercel.app >> backend\.env.example

echo [ÉTAPE 3] Préparation du frontend...
echo.

cd frontend

REM Créer .env.production pour le frontend
echo [INFO] Création fichier .env.production...
echo REACT_APP_API_URL=https://your-backend-domain.railway.app/api > .env.production

REM Build du frontend
echo [INFO] Build du frontend...
npm run build
if errorlevel 1 (
    echo ❌ Erreur lors du build frontend
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo        DÉPLOIEMENT PRÊT !
echo ========================================
echo.

echo 🚀 PROCHAINES ÉTAPES MANUELLES :
echo.
echo 📱 1. DÉPLOYER LE BACKEND (Railway) :
echo    cd backend
echo    railway login
echo    railway init
echo    railway variables set OPENAI_API_KEY=sk-proj-...
echo    railway variables set FLASK_ENV=production
echo    railway up
echo.
echo 🌐 2. DÉPLOYER LE FRONTEND (Vercel) :
echo    cd frontend
echo    vercel login
echo    vercel --prod
echo.
echo 🔧 3. CONFIGURER LES VARIABLES :
echo    - Copier l'URL du backend Railway
echo    - Mettre à jour REACT_APP_API_URL
echo    - Redéployer le frontend
echo.
echo 📋 4. URLS FINALES :
echo    Frontend : https://smart-excel-[random].vercel.app
echo    Backend  : https://smart-excel-[random].railway.app
echo.
echo 🎉 Votre application sera accessible en ligne !
echo.

echo Voulez-vous voir le guide détaillé ? (o/n)
set /p choice=
if /i "%choice%"=="o" (
    start GUIDE_DEPLOIEMENT_WEB.md
)

pause
