@echo off
REM Script de diagnostic complet du frontend SMART-EXCEL

title SMART-EXCEL - Diagnostic Frontend
color 0E

echo ========================================
echo    DIAGNOSTIC FRONTEND - SMART-EXCEL
echo ========================================
echo.

echo [DIAGNOSTIC] Vérification de l'environnement...
echo.

REM Test 1: Node.js
echo [1/6] Test Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js NON INSTALLE
    echo.
    echo 📥 SOLUTION: Téléchargez Node.js LTS depuis https://nodejs.org
    echo    1. Installez avec les options par défaut
    echo    2. Redémarrez votre ordinateur
    echo    3. Relancez ce script
    echo.
    set "NODEJS_PROBLEM=1"
    goto :problems_found
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js installé: %NODE_VERSION%
)

REM Test 2: NPM
echo [2/6] Test NPM...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ NPM non disponible
    set "NPM_PROBLEM=1"
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ NPM disponible: %NPM_VERSION%
)

REM Test 3: Dossier node_modules
echo [3/6] Test dépendances installées...
cd frontend
if not exist "node_modules" (
    echo ❌ Dépendances NON INSTALLÉES
    echo.
    echo 📦 SOLUTION: Installer les dépendances
    echo    npm install
    echo.
    set "DEPS_PROBLEM=1"
) else (
    echo ✅ Dossier node_modules présent
)

REM Test 4: Capacitor Core
echo [4/6] Test Capacitor Core...
if exist "node_modules\@capacitor\core" (
    echo ✅ @capacitor/core installé
) else (
    echo ❌ @capacitor/core MANQUANT
    set "CAPACITOR_PROBLEM=1"
)

REM Test 5: Configuration Capacitor
echo [5/6] Test configuration Capacitor...
if exist "capacitor.config.ts" (
    echo ✅ capacitor.config.ts présent
) else (
    echo ❌ capacitor.config.ts MANQUANT
    set "CONFIG_PROBLEM=1"
)

REM Test 6: Dossier Android
echo [6/6] Test plateforme Android...
if exist "android" (
    echo ✅ Dossier android présent
) else (
    echo ❌ Dossier android MANQUANT
    set "ANDROID_PROBLEM=1"
)

echo.
echo ========================================
echo           RÉSULTATS DIAGNOSTIC
echo ========================================

if "%NODEJS_PROBLEM%"=="1" goto :problems_found
if "%NPM_PROBLEM%"=="1" goto :problems_found
if "%DEPS_PROBLEM%"=="1" goto :deps_solution
if "%CAPACITOR_PROBLEM%"=="1" goto :capacitor_solution
if "%CONFIG_PROBLEM%"=="1" goto :config_solution
if "%ANDROID_PROBLEM%"=="1" goto :android_solution

echo.
echo 🎉 AUCUN PROBLÈME DÉTECTÉ !
echo.
echo ✅ Node.js installé
echo ✅ Dépendances installées
echo ✅ Capacitor configuré
echo ✅ Plateforme Android prête
echo.
echo 📱 Vous pouvez générer l'APK:
echo    npx cap open android
echo.
goto :end

:problems_found
echo.
echo ⚠️  PROBLÈMES CRITIQUES DÉTECTÉS
echo.
echo 🔧 Actions requises:
if "%NODEJS_PROBLEM%"=="1" echo    1. Installer Node.js: https://nodejs.org
if "%NPM_PROBLEM%"=="1" echo    2. Vérifier l'installation NPM
echo.
echo 🔄 Relancez ce script après correction
goto :end

:deps_solution
echo.
echo 📦 INSTALLATION DES DÉPENDANCES REQUISE
echo.
set /p choice="Voulez-vous installer les dépendances maintenant ? (o/n): "
if /i "%choice%"=="o" (
    echo [INFO] Installation des dépendances...
    npm install
    if errorlevel 1 (
        echo [ERREUR] Échec installation dépendances
        goto :end
    )
    echo [INFO] Installation des plugins Capacitor...
    npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network @capacitor/status-bar @capacitor/keyboard
    echo ✅ Dépendances installées !
    echo.
    echo 🔄 Relancez ce script pour continuer le diagnostic
)
goto :end

:capacitor_solution
echo.
echo 🔧 CONFIGURATION CAPACITOR REQUISE
echo.
set /p choice="Voulez-vous configurer Capacitor maintenant ? (o/n): "
if /i "%choice%"=="o" (
    echo [INFO] Installation Capacitor...
    npm install @capacitor/core @capacitor/cli @capacitor/android
    npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network
    echo [INFO] Initialisation Capacitor...
    npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
    echo ✅ Capacitor configuré !
)
goto :end

:config_solution
echo.
echo ⚙️  INITIALISATION CAPACITOR REQUISE
echo.
set /p choice="Voulez-vous initialiser Capacitor maintenant ? (o/n): "
if /i "%choice%"=="o" (
    npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
    echo ✅ Configuration créée !
)
goto :end

:android_solution
echo.
echo 📱 PLATEFORME ANDROID REQUISE
echo.
set /p choice="Voulez-vous ajouter la plateforme Android maintenant ? (o/n): "
if /i "%choice%"=="o" (
    echo [INFO] Build React...
    npm run build
    echo [INFO] Ajout plateforme Android...
    npx cap add android
    echo [INFO] Synchronisation...
    npx cap sync
    echo ✅ Plateforme Android ajoutée !
    echo.
    echo 📱 Vous pouvez maintenant ouvrir Android Studio:
    echo    npx cap open android
)
goto :end

:end
echo.
echo ========================================
echo.
pause
