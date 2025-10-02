# 🚀 Guide d'Installation - Excel AI Editor

Ce guide vous accompagne pas à pas pour installer et configurer l'application Excel AI Editor sur votre machine.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

### Obligatoire
- **Python 3.8+** : [Télécharger Python](https://www.python.org/downloads/)
- **Node.js 16+** : [Télécharger Node.js](https://nodejs.org/)
- **Git** : [Télécharger Git](https://git-scm.com/)

### Optionnel
- **Docker** : [Télécharger Docker](https://www.docker.com/) (pour le déploiement containerisé)
- **Visual Studio Code** : [Télécharger VS Code](https://code.visualstudio.com/) (éditeur recommandé)

## 📥 Téléchargement du Projet

### Option 1: Cloner avec Git
```bash
git clone <url-du-repository>
cd excel-ai-editor
```

### Option 2: Télécharger le ZIP
1. Téléchargez le fichier ZIP du projet
2. Extrayez-le dans un dossier de votre choix
3. Ouvrez un terminal dans ce dossier

## 🐍 Installation du Backend (Python/Flask)

### 1. Naviguer vers le dossier backend
```bash
cd backend
```

### 2. Créer un environnement virtuel Python
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Installer les dépendances Python
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configuration (optionnel)
```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer le fichier .env avec vos paramètres
# Vous pouvez utiliser nano, vim, ou votre éditeur préféré
nano .env
```

### 5. Tester le backend
```bash
python app.py
```

Vous devriez voir :
```
🚀 Démarrage du serveur Flask...
📊 Application d'édition Excel avec IA
🌐 Interface disponible sur: http://localhost:5000
```

Laissez ce terminal ouvert et ouvrez un nouveau terminal pour le frontend.

## ⚛️ Installation du Frontend (React)

### 1. Naviguer vers le dossier frontend
```bash
cd frontend
```

### 2. Installer les dépendances Node.js
```bash
npm install
```

### 3. Configuration (optionnel)
```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer si nécessaire
nano .env
```

### 4. Démarrer le serveur de développement
```bash
npm start
```

Vous devriez voir :
```
Compiled successfully!

You can now view excel-ai-editor-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

## 🌐 Accès à l'Application

1. **Ouvrez votre navigateur**
2. **Allez sur** `http://localhost:3000`
3. **L'application devrait se charger** avec l'interface d'upload

## ✅ Vérification de l'Installation

### Test 1: Interface utilisateur
- [ ] L'interface se charge correctement
- [ ] Vous voyez la zone de drag & drop pour les fichiers
- [ ] Le panneau "Assistant IA" est visible

### Test 2: Upload de fichier
- [ ] Glissez-déposez un fichier Excel (.xlsx) ou CSV
- [ ] Le fichier se charge et s'affiche dans le tableau
- [ ] Vous pouvez éditer les cellules en double-cliquant

### Test 3: Commandes IA
- [ ] Tapez "Calcule la somme de la colonne A" (adaptez selon vos données)
- [ ] La commande est traitée et un résultat s'affiche
- [ ] Essayez d'autres commandes comme "Ajoute une colonne test"

### Test 4: Export
- [ ] Cliquez sur le bouton "Exporter"
- [ ] Un fichier Excel est téléchargé

## 🐳 Installation avec Docker (Alternative)

Si vous préférez utiliser Docker :

### 1. Construire et lancer avec Docker Compose
```bash
# Dans le dossier racine du projet
docker-compose up --build
```

### 2. Accéder à l'application
- **Frontend** : `http://localhost:3000`
- **Backend** : `http://localhost:5000`

## 🔧 Résolution des Problèmes Courants

### Problème : "Python n'est pas reconnu"
**Solution** : Ajoutez Python à votre PATH ou utilisez `python3` au lieu de `python`

### Problème : "npm n'est pas reconnu"
**Solution** : Redémarrez votre terminal après l'installation de Node.js

### Problème : "Port 3000 déjà utilisé"
**Solution** : 
```bash
# Tuer le processus sur le port 3000
npx kill-port 3000

# Ou utiliser un autre port
PORT=3001 npm start
```

### Problème : "Port 5000 déjà utilisé"
**Solution** :
```bash
# Modifier le port dans backend/app.py
app.run(debug=True, host='0.0.0.0', port=5001)

# Et mettre à jour l'URL dans frontend/.env
REACT_APP_API_URL=http://localhost:5001/api
```

### Problème : Erreur CORS
**Solution** : Vérifiez que le backend est bien démarré avant le frontend

### Problème : Erreur lors de l'installation des dépendances Python
**Solution** :
```bash
# Mettre à jour pip
pip install --upgrade pip

# Installer les dépendances une par une en cas d'erreur
pip install flask flask-cors pandas numpy openpyxl
```

## 📱 Configuration pour Mobile/Tablette

L'application est responsive, mais pour tester sur mobile :

1. **Trouvez votre IP locale** :
   ```bash
   # Windows
   ipconfig
   
   # macOS/Linux
   ifconfig
   ```

2. **Accédez depuis votre mobile** : `http://[VOTRE-IP]:3000`

## 🔐 Configuration de Sécurité (Production)

Pour un déploiement en production :

### 1. Backend
```bash
# Dans backend/.env
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=votre-clé-secrète-très-longue-et-complexe
```

### 2. Frontend
```bash
# Build de production
npm run build

# Servir avec un serveur web (nginx, apache, etc.)
```

## 🆘 Support

Si vous rencontrez des problèmes :

1. **Vérifiez les logs** dans les terminaux backend et frontend
2. **Consultez la section troubleshooting** du README.md
3. **Ouvrez une issue** sur le repository GitHub
4. **Vérifiez que tous les prérequis** sont installés

## 🎉 Félicitations !

Votre installation d'Excel AI Editor est maintenant terminée ! 

**Prochaines étapes** :
- Explorez les fonctionnalités avec vos propres fichiers Excel
- Testez les différentes commandes IA
- Consultez la documentation pour les fonctionnalités avancées

---

**Bon développement ! 🚀**
