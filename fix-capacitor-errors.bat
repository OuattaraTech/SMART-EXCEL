@echo off
REM Script de correction automatique des erreurs Capacitor

title SMART-EXCEL - Correction Erreurs Capacitor
color 0A

echo ========================================
echo   CORRECTION ERREURS CAPACITOR
echo ========================================
echo.

cd frontend

echo [ÉTAPE 1] Vérification de l'environnement...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js requis ! Installez depuis https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js détecté
echo.

echo [ÉTAPE 2] Nettoyage et réinstallation...
if exist "node_modules" (
    echo [INFO] Suppression ancien node_modules...
    rmdir /s /q node_modules
)

if exist "package-lock.json" (
    echo [INFO] Suppression package-lock.json...
    del package-lock.json
)

echo [ÉTAPE 3] Installation des dépendances de base...
npm install

echo [ÉTAPE 4] Installation des plugins Capacitor...
npm install @capacitor/core@latest
npm install @capacitor/cli@latest
npm install @capacitor/android@latest
npm install @capacitor/filesystem@latest
npm install @capacitor/share@latest
npm install @capacitor/toast@latest
npm install @capacitor/network@latest
npm install @capacitor/status-bar@latest
npm install @capacitor/keyboard@latest

echo [ÉTAPE 5] Vérification de la configuration...
if not exist "capacitor.config.ts" (
    echo [INFO] Initialisation Capacitor...
    npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
)

echo [ÉTAPE 6] Build du projet React...
npm run build
if errorlevel 1 (
    echo ❌ Erreur lors du build React
    echo [INFO] Vérifiez les erreurs ci-dessus
    pause
    exit /b 1
)

echo [ÉTAPE 7] Configuration de la plateforme Android...
if not exist "android" (
    echo [INFO] Ajout plateforme Android...
    npx cap add android
)

echo [ÉTAPE 8] Synchronisation Capacitor...
npx cap sync

echo [ÉTAPE 9] Vérification finale...
if exist "android\app\src\main\AndroidManifest.xml" (
    echo ✅ Configuration Android OK
) else (
    echo ❌ Problème configuration Android
)

echo.
echo ========================================
echo           CORRECTION TERMINÉE
echo ========================================
echo.
echo ✅ Capacitor configuré
echo ✅ Plugins installés
echo ✅ Plateforme Android prête
echo.
echo 📱 Prochaines étapes:
echo    1. npx cap open android (ouvrir Android Studio)
echo    2. Build ^> Generate Signed Bundle / APK
echo.
pause
