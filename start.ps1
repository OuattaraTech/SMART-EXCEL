# Script PowerShell pour démarrer SMART-EXCEL
# Usage: .\start.ps1 ou PowerShell -ExecutionPolicy Bypass -File start.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SMART-EXCEL - Démarrage Automatique" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour afficher les messages colorés
function Write-Info {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param($Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Warning {
    param($Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

# Vérifier si Python est installé
try {
    $pythonVersion = python --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Python non trouvé"
    }
    Write-Success "Python détecté: $pythonVersion"
} catch {
    Write-Error "Python n'est pas installé ou pas dans le PATH"
    Write-Error "Veuillez installer Python 3.8+ depuis https://python.org"
    Read-Host "Appuyez sur Entrée pour continuer..."
    exit 1
}

# Vérifier si Node.js est installé
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Node.js non trouvé"
    }
    Write-Success "Node.js détecté: $nodeVersion"
} catch {
    Write-Error "Node.js n'est pas installé ou pas dans le PATH"
    Write-Error "Veuillez installer Node.js 16+ depuis https://nodejs.org"
    Read-Host "Appuyez sur Entrée pour continuer..."
    exit 1
}

Write-Info "Vérification des prérequis... OK"
Write-Host ""

# Créer les dossiers nécessaires
$backendUploads = "backend\uploads"
$backendExports = "backend\exports"

if (!(Test-Path $backendUploads)) {
    New-Item -ItemType Directory -Path $backendUploads -Force | Out-Null
    Write-Info "Dossier uploads créé"
}

if (!(Test-Path $backendExports)) {
    New-Item -ItemType Directory -Path $backendExports -Force | Out-Null
    Write-Info "Dossier exports créé"
}

Write-Host ""

# Fonction pour nettoyer les processus
function Stop-Processes {
    Write-Info "Arrêt des processus..."
    Get-Process | Where-Object {$_.ProcessName -eq "python" -or $_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
}

# Capturer Ctrl+C
Register-EngineEvent PowerShell.Exiting -Action { Stop-Processes }

# Démarrer le backend
Write-Info "Configuration du backend Flask..."
Set-Location backend

# Vérifier si l'environnement virtuel existe
if (!(Test-Path "venv")) {
    Write-Info "Création de l'environnement virtuel Python..."
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erreur lors de la création de l'environnement virtuel"
        exit 1
    }
}

# Activer l'environnement virtuel
Write-Info "Activation de l'environnement virtuel..."
& "venv\Scripts\Activate.ps1"

# Installer les dépendances si nécessaire
if (!(Test-Path "venv\Lib\site-packages\flask")) {
    Write-Info "Installation des dépendances Python..."
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erreur lors de l'installation des dépendances Python"
        exit 1
    }
}

# Démarrer Flask en arrière-plan
Write-Info "Lancement du serveur Flask sur http://localhost:5000"
$flaskJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    & "venv\Scripts\python.exe" app.py
}

Set-Location ..

# Attendre que le backend soit prêt
Write-Info "Attente du démarrage du backend..."
Start-Sleep -Seconds 5

# Vérifier que le backend répond
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/status" -TimeoutSec 10 -ErrorAction Stop
    Write-Success "Backend démarré avec succès"
} catch {
    Write-Warning "Le backend met du temps à démarrer, patientez..."
    Start-Sleep -Seconds 5
}

# Démarrer le frontend
Write-Info "Configuration du frontend React..."
Set-Location frontend

# Installer les dépendances si nécessaire
if (!(Test-Path "node_modules")) {
    Write-Info "Installation des dépendances Node.js..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erreur lors de l'installation des dépendances Node.js"
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Application prête !" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Info "Appuyez sur Ctrl+C pour arrêter les serveurs"
Write-Host ""

# Démarrer React (bloquant)
Write-Info "Lancement du serveur React sur http://localhost:3000"
npm start

# Si on arrive ici, React s'est arrêté
Write-Host ""
Write-Info "Arrêt de l'application..."
Stop-Job $flaskJob -ErrorAction SilentlyContinue
Remove-Job $flaskJob -ErrorAction SilentlyContinue

Write-Host "Application arrêtée." -ForegroundColor Yellow
Read-Host "Appuyez sur Entrée pour fermer..."
