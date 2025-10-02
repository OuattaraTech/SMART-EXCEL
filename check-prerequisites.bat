@echo off
REM Script pour vérifier les prérequis Android Studio

title SMART-EXCEL - Vérification Prérequis Android
color 0C

echo ========================================
echo    VERIFICATION PREREQUIS ANDROID
echo ========================================
echo.

REM Vérifier Node.js
echo [1/4] Vérification Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js NON INSTALLE
    echo.
    echo 📥 Téléchargez Node.js depuis: https://nodejs.org
    echo    Choisissez la version LTS
    echo    Redémarrez après installation
    echo.
    set "NODEJS_OK=0"
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js installé: %NODE_VERSION%
    set "NODEJS_OK=1"
)

REM Vérifier NPM
echo [2/4] Vérification NPM...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ NPM NON DISPONIBLE
    set "NPM_OK=0"
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ NPM installé: %NPM_VERSION%
    set "NPM_OK=1"
)

REM Vérifier Java
echo [3/4] Vérification Java JDK...
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ Java JDK NON INSTALLE
    echo.
    echo 📥 Téléchargez Java JDK 11+ depuis: https://adoptium.net
    echo    Choisissez la version LTS
    echo.
    set "JAVA_OK=0"
) else (
    echo ✅ Java JDK installé
    set "JAVA_OK=1"
)

REM Vérifier Android Studio (approximatif)
echo [4/4] Vérification Android Studio...
if exist "%LOCALAPPDATA%\Android\Sdk" (
    echo ✅ Android SDK détecté
    set "ANDROID_OK=1"
) else if exist "%PROGRAMFILES%\Android\Android Studio" (
    echo ✅ Android Studio détecté
    set "ANDROID_OK=1"
) else (
    echo ❌ Android Studio NON DETECTE
    echo.
    echo 📥 Téléchargez Android Studio depuis:
    echo    https://developer.android.com/studio
    echo.
    set "ANDROID_OK=0"
)

echo.
echo ========================================
echo           RESULTAT FINAL
echo ========================================

if "%NODEJS_OK%"=="1" if "%NPM_OK%"=="1" if "%JAVA_OK%"=="1" if "%ANDROID_OK%"=="1" (
    echo.
    echo 🎉 TOUS LES PREREQUIS SONT INSTALLES !
    echo.
    echo 📱 Vous pouvez maintenant générer l'APK:
    echo    1. Ouvrez un nouveau terminal
    echo    2. Exécutez: build-apk.bat
    echo    3. Suivez le guide: GUIDE_ANDROID_STUDIO.md
    echo.
    color 0A
) else (
    echo.
    echo ⚠️  PREREQUIS MANQUANTS DETECTES
    echo.
    echo 📋 Actions requises:
    if "%NODEJS_OK%"=="0" echo    - Installer Node.js: https://nodejs.org
    if "%JAVA_OK%"=="0" echo    - Installer Java JDK: https://adoptium.net
    if "%ANDROID_OK%"=="0" echo    - Installer Android Studio: https://developer.android.com/studio
    echo.
    echo 🔄 Relancez ce script après installation
    echo.
)

echo ========================================
echo.

REM Proposer d'ouvrir les liens
set /p choice="Voulez-vous ouvrir les pages de téléchargement ? (o/n): "
if /i "%choice%"=="o" (
    if "%NODEJS_OK%"=="0" start https://nodejs.org
    if "%JAVA_OK%"=="0" start https://adoptium.net
    if "%ANDROID_OK%"=="0" start https://developer.android.com/studio
)

echo.
echo Appuyez sur une touche pour continuer...
pause >nul
