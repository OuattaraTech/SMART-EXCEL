# 📊 SMART-EXCEL - Excel AI Editor

Une application web moderne pour l'édition intelligente de fichiers Excel avec intelligence artificielle.

## 🚀 Fonctionnalités

### ✨ Édition Excel Avancée
- **Import de fichiers** : Support des formats .xlsx, .xls et .csv
- **Édition en temps réel** : Modification directe des cellules dans l'interface
- **Visualisation interactive** : Tableau dynamique avec tri, filtres et pagination
- **Export Excel** : Sauvegarde des modifications au format Excel

### 🤖 Intelligence Artificielle
- **Commandes en langage naturel** : "Calcule la somme de la colonne B", "Ajoute une colonne TVA à 18%"
- **Opérations automatisées** : Calculs, filtres, ajout de colonnes, tri des données
- **Interface intuitive** : Suggestions de commandes et exemples intégrés

### 🎨 Interface Moderne
- **Design responsive** : Compatible desktop, tablette et mobile
- **Thème Material-UI** : Interface élégante et professionnelle
- **Drag & Drop** : Upload de fichiers par glisser-déposer
- **Notifications** : Feedback en temps réel des opérations

## 🛠️ Technologies Utilisées

### Backend
- **Python 3.8+** avec Flask
- **pandas** pour le traitement des données Excel
- **openpyxl** pour la lecture/écriture des fichiers Excel
- **Flask-CORS** pour les requêtes cross-origin

### Frontend
- **React 18** avec hooks modernes
- **Material-UI (MUI)** pour les composants UI
- **AG-Grid** pour l'affichage des tableaux
- **Axios** pour les requêtes HTTP
- **React-Dropzone** pour l'upload de fichiers

## 📦 Installation

### Prérequis
- Python 3.8 ou supérieur
- Node.js 16 ou supérieur
- npm ou yarn

### 1. Cloner le projet
```bash
git clone https://github.com/OuattaraTech/SMART-EXCEL.git
cd SMART-EXCEL
```

### 2. Installation du Backend

```bash
# Aller dans le dossier backend
cd backend

# Créer un environnement virtuel (recommandé)
python -m venv venv

# Activer l'environnement virtuel
# Sur Windows :
venv\Scripts\activate
# Sur macOS/Linux :
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
```

### 3. Installation du Frontend

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install
```

## 🚀 Lancement de l'Application

### Démarrage Automatique (Recommandé)

#### Windows
```bash
# Double-cliquez sur le fichier ou exécutez :
start.bat
```

#### macOS/Linux
```bash
# Rendez le script exécutable puis lancez :
chmod +x start.sh
./start.sh
```

### Démarrage Manuel

#### 1. Démarrer le Backend
```bash
cd backend
python app.py
```
Le serveur Flask démarre sur `http://localhost:5000`

#### 2. Démarrer le Frontend
```bash
cd frontend
npm start
```
L'interface React démarre sur `http://localhost:3000`

### 3. Accéder à l'Application

Ouvrez votre navigateur et allez sur `http://localhost:3000`

## 📖 Guide d'Utilisation

### 1. Import de Fichier Excel

1. **Glissez-déposez** votre fichier Excel (.xlsx, .xls, .csv) dans la zone prévue
2. Ou **cliquez** sur "Sélectionner un fichier" pour parcourir vos fichiers
3. Le fichier est automatiquement analysé et affiché dans le tableau

### 2. Édition des Données

- **Double-cliquez** sur une cellule pour l'éditer
- **Appuyez sur Entrée** ou cliquez ailleurs pour valider
- Les modifications sont **sauvegardées automatiquement**

### 3. Commandes IA

Utilisez le panneau "Assistant IA" pour envoyer des commandes en langage naturel :

#### Exemples de Calculs
```
Calcule la somme de la colonne B
Calcule la moyenne des prix
Trouve le maximum de la colonne ventes
```

#### Exemples de Modifications
```
Ajoute une colonne TVA à 20%
Multiplie la colonne prix par 1.1
Remplace les valeurs vides par 0
```

#### Exemples de Filtres
```
Filtre les lignes où le prix > 100
Trie par ordre croissant de date
Affiche uniquement les ventes de janvier
```

### 4. Export des Données

1. Cliquez sur le bouton **"Exporter"** dans l'en-tête
2. Le fichier Excel modifié est automatiquement téléchargé

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` dans le dossier `backend` :

```env
# Configuration Flask
FLASK_ENV=development
FLASK_DEBUG=True

# Configuration OpenAI (optionnel)
OPENAI_API_KEY=votre_clé_api_openai

# Configuration de l'application
MAX_FILE_SIZE=16777216  # 16MB en octets
UPLOAD_FOLDER=uploads
EXPORT_FOLDER=exports
```

### Configuration Frontend

Créez un fichier `.env` dans le dossier `frontend` :

```env
# URL de l'API backend
REACT_APP_API_URL=http://localhost:5000/api

# Configuration de développement
GENERATE_SOURCEMAP=false
```

## 🤖 Intégration IA Avancée

### Configuration OpenAI

Pour utiliser GPT-4 ou d'autres modèles OpenAI :

1. Obtenez une clé API sur [OpenAI](https://platform.openai.com/)
2. Ajoutez la clé dans le fichier `.env` du backend
3. Modifiez la classe `AICommandProcessor` dans `backend/app.py`

### Autres APIs IA

L'architecture supporte facilement d'autres APIs :
- **Google Gemini**
- **Anthropic Claude**
- **Groq**
- **Modèles locaux avec Ollama**

## 📁 Structure du Projet

```
SMART-EXCEL/
├── backend/                 # API Flask
│   ├── app.py              # Application principale
│   ├── requirements.txt    # Dépendances Python
│   ├── uploads/           # Fichiers uploadés
│   └── exports/           # Fichiers exportés
├── frontend/               # Interface React
│   ├── public/            # Fichiers statiques
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── services/      # Services API
│   │   ├── App.js         # Composant principal
│   │   └── index.js       # Point d'entrée
│   └── package.json       # Dépendances Node.js
├── examples/              # Données et commandes d'exemple
├── docker-compose.yml     # Configuration Docker
├── start.bat             # Script de démarrage Windows
├── start.sh              # Script de démarrage macOS/Linux
└── README.md             # Documentation
```

## 🧪 Tests

### Tests Backend
```bash
cd backend
python -m pytest tests/
```

### Tests Frontend
```bash
cd frontend
npm test
```

## 🚀 Déploiement

### Déploiement Local avec Docker

```bash
# Construire les images
docker-compose build

# Lancer l'application
docker-compose up
```

### Déploiement en Production

1. **Backend** : Déployez sur Heroku, AWS, ou votre serveur
2. **Frontend** : Buildez et déployez sur Netlify, Vercel, ou votre CDN

```bash
# Build de production
cd frontend
npm run build
```

## 🤝 Contribution

1. **Fork** le projet
2. Créez une **branche feature** (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Committez** vos changements (`git commit -am 'Ajoute nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une **Pull Request**

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Issues** : Ouvrez une issue sur GitHub
- **Documentation** : Consultez ce README
- **Exemples** : Voir le dossier `examples/`

## 🔮 Roadmap

- [ ] **Authentification utilisateur**
- [ ] **Collaboration en temps réel**
- [ ] **Graphiques et visualisations**
- [ ] **Templates de fichiers Excel**
- [ ] **API REST complète**
- [ ] **Mode hors ligne**
- [ ] **Intégration avec Google Sheets**

---

**Développé avec ❤️ par [OuattaraTech](https://github.com/OuattaraTech) pour simplifier l'édition de fichiers Excel**
