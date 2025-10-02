#!/bin/bash

# Script pour générer l'APK de SMART-EXCEL
# Prérequis: Node.js, Android Studio, Java JDK installés

set -e

echo "========================================"
echo "   SMART-EXCEL - Génération APK"
echo "========================================"
echo

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier les prérequis
log_info "Vérification des prérequis..."

if ! command -v node &> /dev/null; then
    log_error "Node.js n'est pas installé"
    log_error "Téléchargez depuis https://nodejs.org"
    exit 1
fi

if ! command -v java &> /dev/null; then
    log_error "Java JDK n'est pas installé"
    log_error "Téléchargez depuis https://adoptium.net"
    exit 1
fi

log_success "Prérequis vérifiés"
echo

# Aller dans le dossier frontend
cd frontend

# Installer Capacitor si pas déjà fait
log_info "Installation de Capacitor..."
npm install @capacitor/core @capacitor/cli @capacitor/android --save

# Installer les plugins utiles
npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network @capacitor/status-bar @capacitor/keyboard --save

# Build de l'application React
log_info "Build de l'application React..."
npm run build

# Initialiser Capacitor si pas déjà fait
if [ ! -f "capacitor.config.ts" ]; then
    log_info "Initialisation de Capacitor..."
    npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
fi

# Ajouter la plateforme Android si pas déjà fait
if [ ! -d "android" ]; then
    log_info "Ajout de la plateforme Android..."
    npx cap add android
fi

# Synchroniser les fichiers
log_info "Synchronisation des fichiers..."
npx cap sync

echo
echo "========================================"
echo "   Configuration terminée !"
echo "========================================"
echo
echo "Prochaines étapes:"
echo "1. Ouvrir Android Studio: npx cap open android"
echo "2. Build APK: Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "3. L'APK sera dans: android/app/build/outputs/apk/debug/"
echo

# Demander si on veut ouvrir Android Studio
read -p "Voulez-vous ouvrir Android Studio maintenant ? (o/n): " choice
if [[ $choice == "o" || $choice == "O" ]]; then
    log_info "Ouverture d'Android Studio..."
    npx cap open android
else
    log_info "Vous pouvez ouvrir Android Studio plus tard avec: npx cap open android"
fi

echo
log_success "Génération APK terminée !"
