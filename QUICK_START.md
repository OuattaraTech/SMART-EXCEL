# ⚡ Démarrage Rapide - Excel AI Editor

## 🚀 Lancement Automatique

### Windows
```bash
# Double-cliquez sur le fichier ou exécutez :
start.bat
```

### macOS/Linux
```bash
# Rendez le script exécutable puis lancez :
chmod +x start.sh
./start.sh
```

### Docker (Toutes plateformes)
```bash
docker-compose up --build
```

## 📋 Lancement Manuel

### 1. Backend (Terminal 1)
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux  
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

## 🌐 Accès

- **Application** : http://localhost:3000
- **API Backend** : http://localhost:5000

## 🧪 Test Rapide

1. **Uploadez** le fichier `examples/sample_data.xlsx`
2. **Testez une commande IA** : "Calcule la somme de la colonne Prix"
3. **Éditez une cellule** en double-cliquant
4. **Exportez** le fichier modifié

## 🆘 Problèmes Courants

### Port déjà utilisé
```bash
# Tuer les processus sur les ports
npx kill-port 3000
npx kill-port 5000
```

### Dépendances manquantes
```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
rm -rf node_modules
npm install
```

### Erreur CORS
- Vérifiez que le backend est démarré avant le frontend
- Vérifiez l'URL dans `frontend/.env`

---

**🎉 Prêt à éditer vos fichiers Excel avec l'IA !**
