@echo off
REM Script pour générer l'APK de SMART-EXCEL
REM Prérequis: Node.js, Android Studio, Java JDK installés

title SMART-EXCEL - Génération APK
color 0B

echo ========================================
echo    SMART-EXCEL - Génération APK
echo ========================================
echo.

REM Vérifier les prérequis
echo [INFO] Vérification des prérequis...

node --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js non installé
    echo Téléchargez depuis https://nodejs.org
    pause
    exit /b 1
)

java -version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Java JDK non installé
    echo Téléchargez depuis https://adoptium.net
    pause
    exit /b 1
)

echo [OK] Prérequis vérifiés
echo.

REM Aller dans le dossier frontend
cd frontend

REM Installer Capacitor si pas déjà fait
echo [INFO] Installation de Capacitor...
npm install @capacitor/core @capacitor/cli @capacitor/android --save

REM Installer les plugins utiles
npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network @capacitor/status-bar @capacitor/keyboard --save

REM Build de l'application React
echo [INFO] Build de l'application React...
npm run build
if errorlevel 1 (
    echo [ERREUR] Échec du build React
    pause
    exit /b 1
)

REM Initialiser Capacitor si pas déjà fait
if not exist "capacitor.config.ts" (
    echo [INFO] Initialisation de Capacitor...
    npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
)

REM Ajouter la plateforme Android si pas déjà fait
if not exist "android" (
    echo [INFO] Ajout de la plateforme Android...
    npx cap add android
)

REM Synchroniser les fichiers
echo [INFO] Synchronisation des fichiers...
npx cap sync

echo.
echo ========================================
echo   Configuration terminée !
echo ========================================
echo.
echo Prochaines étapes:
echo 1. Ouvrir Android Studio: npx cap open android
echo 2. Build APK: Build → Build Bundle(s) / APK(s) → Build APK(s)
echo 3. L'APK sera dans: android/app/build/outputs/apk/debug/
echo.

REM Demander si on veut ouvrir Android Studio
set /p choice="Voulez-vous ouvrir Android Studio maintenant ? (o/n): "
if /i "%choice%"=="o" (
    echo [INFO] Ouverture d'Android Studio...
    npx cap open android
) else (
    echo [INFO] Vous pouvez ouvrir Android Studio plus tard avec: npx cap open android
)

echo.
echo Génération APK terminée !
pause
