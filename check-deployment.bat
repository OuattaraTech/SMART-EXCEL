@echo off
REM Script de vérification du déploiement SMART-EXCEL

title SMART-EXCEL - Vérification Déploiement
color 0A

echo ========================================
echo   VÉRIFICATION DÉPLOIEMENT - SMART-EXCEL
echo ========================================
echo.

echo [INFO] Vérification des URLs de déploiement...
echo.

REM Variables à configurer après déploiement
set "BACKEND_URL="
set "FRONTEND_URL="

echo 📋 INFORMATIONS DE DÉPLOIEMENT :
echo.
echo 🔗 Repository GitHub :
echo    https://github.com/OuattaraTech/SMART-EXCEL.git
echo.
echo 🚀 Plateformes de déploiement :
echo    Backend  : Railway.app (gratuit)
echo    Frontend : Vercel.com (gratuit)
echo.

if "%BACKEND_URL%"=="" (
    echo ⚠️  URLs non configurées - À faire après déploiement
    echo.
    echo 📝 ÉTAPES À SUIVRE :
    echo.
    echo 1️⃣  DÉPLOYER LE BACKEND SUR RAILWAY :
    echo    • Aller sur https://railway.app
    echo    • "Login with GitHub"
    echo    • "New Project" → "Deploy from GitHub repo"
    echo    • Sélectionner "OuattaraTech/SMART-EXCEL"
    echo    • Root Directory: "backend"
    echo    • Variables d'environnement:
    echo      OPENAI_API_KEY=your-openai-api-key-here
    echo      FLASK_ENV=production
    echo      PORT=5000
    echo.
    echo 2️⃣  DÉPLOYER LE FRONTEND SUR VERCEL :
    echo    • Aller sur https://vercel.com
    echo    • "Continue with GitHub"
    echo    • "New Project" → Import "SMART-EXCEL"
    echo    • Root Directory: "frontend"
    echo    • Framework: "Create React App"
    echo    • Variable d'environnement:
    echo      REACT_APP_API_URL=https://your-railway-url.railway.app/api
    echo.
    echo 3️⃣  CONFIGURER CORS :
    echo    • Dans Railway, ajouter variable:
    echo      CORS_ORIGINS=https://your-vercel-url.vercel.app
    echo    • Redéployer le backend
    echo.
) else (
    echo ✅ URLs configurées :
    echo    Backend  : %BACKEND_URL%
    echo    Frontend : %FRONTEND_URL%
    echo.
    
    echo [TEST] Vérification des endpoints...
    echo.
    
    REM Test du backend (nécessite curl)
    curl -s %BACKEND_URL%/api/health >nul 2>&1
    if errorlevel 1 (
        echo ❌ Backend non accessible : %BACKEND_URL%
    ) else (
        echo ✅ Backend accessible : %BACKEND_URL%
    )
    
    echo.
    echo [INFO] Test du frontend dans le navigateur...
    start %FRONTEND_URL%
)

echo.
echo ========================================
echo         CONFIGURATION ACTUELLE
echo ========================================
echo.

echo 📁 Fichiers de déploiement présents :
if exist "Procfile" (echo ✅ Procfile) else (echo ❌ Procfile manquant)
if exist "runtime.txt" (echo ✅ runtime.txt) else (echo ❌ runtime.txt manquant)
if exist "frontend\vercel.json" (echo ✅ vercel.json) else (echo ❌ vercel.json manquant)
if exist "backend\requirements.txt" (echo ✅ requirements.txt) else (echo ❌ requirements.txt manquant)

echo.
echo 🔧 Variables d'environnement à configurer :
echo.
echo    BACKEND (Railway) :
echo    • OPENAI_API_KEY = your-openai-api-key-here
echo    • FLASK_ENV = production
echo    • PORT = 5000
echo    • CORS_ORIGINS = https://your-vercel-url
echo.
echo    FRONTEND (Vercel) :
echo    • REACT_APP_API_URL = https://your-railway-url/api
echo.

echo 📖 Pour le guide complet :
echo    Ouvrir : DEPLOIEMENT_GITHUB.md
echo.

set /p choice="Voulez-vous ouvrir le guide de déploiement ? (o/n): "
if /i "%choice%"=="o" (
    start DEPLOIEMENT_GITHUB.md
)

echo.
echo 🎯 PROCHAINES ÉTAPES :
echo    1. Suivre le guide DEPLOIEMENT_GITHUB.md
echo    2. Déployer sur Railway + Vercel
echo    3. Tester l'application en ligne
echo    4. Partager l'URL publique !
echo.

pause
