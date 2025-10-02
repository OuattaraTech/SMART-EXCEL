#!/bin/bash

# Script de démarrage rapide pour Excel AI Editor (macOS/Linux)
# Usage: ./start.sh

set -e  # Arrêter le script en cas d'erreur

echo "========================================"
echo "   Excel AI Editor - Démarrage Rapide"
echo "========================================"
echo

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Python est installé
if ! command -v python3 &> /dev/null; then
    log_error "Python 3 n'est pas installé ou pas dans le PATH"
    log_error "Veuillez installer Python 3.8+ depuis https://python.org"
    exit 1
fi

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    log_error "Node.js n'est pas installé ou pas dans le PATH"
    log_error "Veuillez installer Node.js 16+ depuis https://nodejs.org"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    log_error "npm n'est pas installé"
    log_error "Veuillez installer Node.js avec npm depuis https://nodejs.org"
    exit 1
fi

log_success "Vérification des prérequis... OK"
echo

# Créer les dossiers nécessaires
mkdir -p backend/uploads backend/exports
log_info "Dossiers créés"
echo

# Fonction pour nettoyer les processus en cas d'interruption
cleanup() {
    echo
    log_info "Arrêt de l'application..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    exit 0
}

# Capturer Ctrl+C pour nettoyer proprement
trap cleanup SIGINT SIGTERM

# Démarrer le backend
log_info "Démarrage du backend Flask..."
cd backend

# Vérifier si l'environnement virtuel existe
if [ ! -d "venv" ]; then
    log_info "Création de l'environnement virtuel Python..."
    python3 -m venv venv
fi

# Activer l'environnement virtuel
source venv/bin/activate

# Installer les dépendances si nécessaire
if [ ! -f "venv/lib/python*/site-packages/flask/__init__.py" ]; then
    log_info "Installation des dépendances Python..."
    pip install -r requirements.txt
fi

# Démarrer Flask en arrière-plan
log_info "Lancement du serveur Flask sur http://localhost:5000"
python app.py &
BACKEND_PID=$!

cd ..

# Attendre que le backend soit prêt
log_info "Attente du démarrage du backend..."
sleep 3

# Vérifier que le backend est bien démarré
if ! curl -s http://localhost:5000/api/status > /dev/null; then
    log_warning "Le backend met du temps à démarrer, patientez..."
    sleep 5
fi

# Démarrer le frontend
log_info "Démarrage du frontend React..."
cd frontend

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    log_info "Installation des dépendances Node.js..."
    npm install
fi

echo
echo "========================================"
echo "   Application prête !"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "========================================"
echo
log_info "Appuyez sur Ctrl+C pour arrêter les serveurs"
echo

# Démarrer React (bloquant)
npm start &
FRONTEND_PID=$!

# Attendre que les processus se terminent
wait $FRONTEND_PID

# Si on arrive ici, React s'est arrêté
cleanup
