@echo off
REM Script pour corriger les problèmes Capacitor dans SMART-EXCEL

title SMART-EXCEL - Correction Capacitor
color 0D

echo ========================================
echo    CORRECTION CAPACITOR - SMART-EXCEL
echo ========================================
echo.

echo [INFO] Correction des problèmes Capacitor détectés...
echo.

REM Aller dans le dossier frontend
cd frontend

echo [1/5] Installation des dépendances Capacitor...
npm install @capacitor/core @capacitor/cli @capacitor/android
if errorlevel 1 (
    echo [ERREUR] Échec installation Capacitor core
    pause
    exit /b 1
)

echo [2/5] Installation des plugins Capacitor...
npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network @capacitor/status-bar @capacitor/keyboard
if errorlevel 1 (
    echo [ERREUR] Échec installation plugins Capacitor
    pause
    exit /b 1
)

echo [3/5] Vérification de la configuration...
if not exist "capacitor.config.ts" (
    echo [INFO] Initialisation de Capacitor...
    npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
)

echo [4/5] Build de l'application React...
npm run build
if errorlevel 1 (
    echo [ERREUR] Échec du build React
    pause
    exit /b 1
)

echo [5/5] Synchronisation Capacitor...
npx cap sync
if errorlevel 1 (
    echo [WARNING] Problème de synchronisation - continuez manuellement
)

echo.
echo ========================================
echo   CORRECTION TERMINÉE !
echo ========================================
echo.
echo ✅ Dépendances Capacitor installées
echo ✅ Configuration mise à jour
echo ✅ Build React effectué
echo ✅ Synchronisation tentée
echo.
echo 📱 Prochaines étapes:
echo    1. Ouvrir Android Studio: npx cap open android
echo    2. Build APK dans Android Studio
echo    3. Tester sur émulateur/appareil
echo.

set /p choice="Voulez-vous ouvrir Android Studio maintenant ? (o/n): "
if /i "%choice%"=="o" (
    echo [INFO] Ouverture d'Android Studio...
    npx cap open android
) else (
    echo [INFO] Vous pouvez ouvrir Android Studio plus tard avec:
    echo        npx cap open android
)

echo.
echo Correction Capacitor terminée !
pause
