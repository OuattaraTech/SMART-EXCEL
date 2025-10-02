# 🚀 Guide d'Utilisation SMART-EXCEL depuis GitHub

Ce guide vous explique comment cloner, installer et utiliser l'application SMART-EXCEL directement depuis GitHub.

## 📥 **1. Cloner le Repository**

### Méthode 1 : Avec Git (Recommandée)
```bash
# Cloner le repository
git clone https://github.com/OuattaraTech/SMART-EXCEL.git

# Entrer dans le dossier
cd SMART-EXCEL
```

### Méthode 2 : Téléchargement ZIP
1. Allez sur [https://github.com/OuattaraTech/SMART-EXCEL](https://github.com/OuattaraTech/SMART-EXCEL)
2. Cliquez sur **"Code"** → **"Download ZIP"**
3. Extrayez le fichier ZIP
4. Ouvrez un terminal dans le dossier extrait

## 🚀 **2. Lancement de l'Application**

### **Option A : Démarrage Automatique (Recommandé)**

#### Sur Windows
```bash
# Méthode 1 : Script CMD (Le plus fiable)
run.cmd

# Méthode 2 : Script PowerShell
PowerShell -ExecutionPolicy Bypass -File start.ps1

# Méthode 3 : Script Batch avec CMD
cmd /c start.bat

# Méthode 4 : Double-clic
# Double-cliquez sur run.cmd dans l'explorateur Windows
```

#### Sur macOS/Linux
```bash
# Rendre le script exécutable
chmod +x start.sh

# Lancer le script
./start.sh
```

### **Option B : Démarrage Manuel (Si les scripts ne marchent pas)**

#### Étape 1 : Backend (Terminal 1)
```bash
# Aller dans le dossier backend
cd backend

# Créer l'environnement virtuel Python
python -m venv venv

# Activer l'environnement virtuel
# Windows :
venv\Scripts\activate
# macOS/Linux :
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur Flask
python app.py
```

#### Étape 2 : Frontend (Terminal 2 - Nouveau terminal)
```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances Node.js
npm install

# Lancer le serveur React
npm start
```

### **Option C : Avec Docker**
```bash
# Construire et lancer avec Docker Compose
docker-compose up --build

# Ou en arrière-plan
docker-compose up -d --build
```

## 🌐 **3. Accéder à l'Application**

Une fois lancée, ouvrez votre navigateur :

- **🎯 Interface Principale** : [http://localhost:3000](http://localhost:3000)
- **🔧 API Backend** : [http://localhost:5000](http://localhost:5000)
- **📊 Status API** : [http://localhost:5000/api/status](http://localhost:5000/api/status)

## 📊 **4. Utilisation de l'Application**

### **Étape 1 : Upload d'un fichier Excel**
1. **Glissez-déposez** votre fichier Excel (.xlsx, .xls, .csv) dans la zone prévue
2. Ou **cliquez** sur "Sélectionner un fichier"
3. Le fichier est automatiquement analysé et affiché

### **Étape 2 : Édition des données**
- **Double-cliquez** sur une cellule pour l'éditer
- **Appuyez sur Entrée** pour valider
- Les modifications sont sauvegardées automatiquement

### **Étape 3 : Commandes IA**
Utilisez le panneau "Assistant IA" avec des commandes comme :

```
Calcule la somme de la colonne Prix
Ajoute une colonne TVA à 20%
Filtre les lignes où le prix > 100
Trie par ordre croissant de date
Calcule la moyenne des ventes
```

### **Étape 4 : Export**
- Cliquez sur **"Exporter"** dans l'en-tête
- Le fichier Excel modifié est téléchargé automatiquement

## 🧪 **5. Test avec les Données d'Exemple**

L'application inclut des données d'exemple :

```bash
# Le fichier examples/sample_data.xlsx contient :
# - Produits informatiques
# - Prix, quantités, totaux
# - Dates de vente

# Testez avec ces commandes IA :
"Calcule la somme de la colonne Prix"
"Ajoute une colonne Remise à 10%"
"Filtre les produits où le prix > 200"
```

## 🔧 **6. Résolution des Problèmes**

### **Problème : Scripts ne fonctionnent pas sur Windows**
```bash
# Solution 1 : Utiliser run.cmd (le plus fiable)
run.cmd

# Solution 2 : PowerShell avec politique d'exécution
PowerShell -ExecutionPolicy Bypass -File start.ps1

# Solution 3 : CMD avec start.bat
cmd /c start.bat

# Solution 4 : Exécution manuelle (voir Option B ci-dessus)
```

### **Problème : "Python n'est pas installé"**
```bash
# Télécharger Python 3.8+ depuis https://python.org
# Cocher "Add Python to PATH" lors de l'installation
# Redémarrer le terminal
```

### **Problème : "Node.js n'est pas installé"**
```bash
# Télécharger Node.js 16+ depuis https://nodejs.org
# Installer avec les options par défaut
# Redémarrer le terminal
```

### **Problème : "Port déjà utilisé"**
```bash
# Tuer les processus sur les ports
npx kill-port 3000
npx kill-port 5000

# Ou changer les ports dans la configuration
```

### **Problème : Erreur CORS**
```bash
# Vérifier que le backend est démarré avant le frontend
# Vérifier l'URL dans frontend/.env :
# REACT_APP_API_URL=http://localhost:5000/api
```

### **Problème : Permissions Windows**
```bash
# Clic droit sur le script → "Exécuter en tant qu'administrateur"
# Ou débloquer le fichier : Propriétés → Sécurité → Débloquer
```

## 📱 **7. Accès depuis d'autres Appareils**

Pour accéder depuis votre téléphone/tablette :

```bash
# 1. Trouver votre IP locale
ipconfig  # Windows
ifconfig  # macOS/Linux

# 2. Accéder depuis un autre appareil
# http://[VOTRE-IP]:3000
# Exemple : http://192.168.1.100:3000
```

## 🔄 **8. Mise à Jour du Code**

Pour récupérer les dernières modifications :

```bash
# Mettre à jour depuis GitHub
git pull origin main

# Réinstaller les dépendances si nécessaire
cd backend && pip install -r requirements.txt
cd ../frontend && npm install
```

## 📚 **9. Documentation Complète**

- **README.md** : Documentation générale
- **INSTALL.md** : Guide d'installation détaillé
- **QUICK_START.md** : Démarrage rapide
- **examples/sample_commands.md** : Exemples de commandes IA

## 🆘 **10. Support**

Si vous rencontrez des problèmes :

1. **Vérifiez les prérequis** : Python 3.8+, Node.js 16+
2. **Consultez les logs** dans les terminaux
3. **Ouvrez une issue** sur [GitHub](https://github.com/OuattaraTech/SMART-EXCEL/issues)
4. **Vérifiez la documentation** dans le repository

---

## 🎯 **Résumé Rapide pour Windows**

```bash
# Cloner
git clone https://github.com/OuattaraTech/SMART-EXCEL.git
cd SMART-EXCEL

# Lancer (Méthode la plus fiable)
run.cmd

# Accéder
# http://localhost:3000
```

## 🎯 **Résumé Rapide pour macOS/Linux**

```bash
# Cloner
git clone https://github.com/OuattaraTech/SMART-EXCEL.git
cd SMART-EXCEL

# Lancer
chmod +x start.sh
./start.sh

# Accéder
# http://localhost:3000
```

**🎉 Votre application SMART-EXCEL est maintenant prête à l'emploi !**