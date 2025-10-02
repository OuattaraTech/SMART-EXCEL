@echo off
REM Script pour configurer les variables d'environnement SMART-EXCEL

title SMART-EXCEL - Configuration Environnement
color 0E

echo ========================================
echo    SMART-EXCEL - Configuration
echo ========================================
echo.

echo [INFO] Configuration des variables d'environnement...
echo.

REM Définir la clé API OpenAI - REMPLACEZ PAR VOTRE VRAIE CLÉ !
set OPENAI_API_KEY=your-openai-api-key-here

REM Autres variables
set FLASK_ENV=development
set FLASK_DEBUG=True

echo [OK] Variables d'environnement configurées
echo.
echo OPENAI_API_KEY: %OPENAI_API_KEY:~0,20%...
echo FLASK_ENV: %FLASK_ENV%
echo.

echo ========================================
echo   Configuration terminée !
echo   Vous pouvez maintenant lancer:
echo   run.cmd
echo ========================================
echo.

pause
