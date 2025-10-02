# 🚀 Déploiement SMART-EXCEL depuis GitHub

## 📋 **Repository GitHub**
🔗 **https://github.com/OuattaraTech/SMART-EXCEL.git**

---

## 🎯 **PLAN DE DÉPLOIEMENT**

### **Backend → Railway** (Gratuit)
### **Frontend → Vercel** (Gratuit)

---

## 🔧 **ÉTAPE 1: DÉPLOYER LE BACKEND SUR RAILWAY**

### **1.1 Créer un compte Railway**
1. Aller sur **https://railway.app**
2. Cliquer **"Login with GitHub"**
3. Autoriser Railway à accéder à vos repos

### **1.2 Créer le projet backend**
1. Cliquer **"New Project"**
2. Choisir **"Deploy from GitHub repo"**
3. Sélectionner **"OuattaraTech/SMART-EXCEL"**
4. Railway va détecter automatiquement Python

### **1.3 Configurer les variables d'environnement**
Dans Railway Dashboard :
1. Aller dans **"Variables"**
2. Ajouter :
   ```
   OPENAI_API_KEY = your-openai-api-key-here
   FLASK_ENV = production
   PORT = 5000
   ```

### **1.4 Configurer le déploiement**
1. Dans **"Settings"** → **"Environment"**
2. **Root Directory** : `backend`
3. **Build Command** : `pip install -r requirements.txt`
4. **Start Command** : `gunicorn --bind 0.0.0.0:$PORT app:app`

### **1.5 Déployer**
1. Cliquer **"Deploy"**
2. Attendre le build (2-3 minutes)
3. **Récupérer l'URL** : `https://web-production-xxxxx.railway.app`

---

## 🎨 **ÉTAPE 2: DÉPLOYER LE FRONTEND SUR VERCEL**

### **2.1 Créer un compte Vercel**
1. Aller sur **https://vercel.com**
2. Cliquer **"Continue with GitHub"**
3. Autoriser Vercel

### **2.2 Importer le projet**
1. Cliquer **"New Project"**
2. Chercher **"SMART-EXCEL"**
3. Cliquer **"Import"**

### **2.3 Configurer le build**
1. **Framework Preset** : `Create React App`
2. **Root Directory** : `frontend`
3. **Build Command** : `npm run build`
4. **Output Directory** : `build`

### **2.4 Configurer les variables d'environnement**
1. Dans **"Environment Variables"**
2. Ajouter :
   ```
   REACT_APP_API_URL = https://web-production-xxxxx.railway.app/api
   ```
   *(Remplacer par votre URL Railway)*

### **2.5 Déployer**
1. Cliquer **"Deploy"**
2. Attendre le build (2-3 minutes)
3. **Récupérer l'URL** : `https://smart-excel-xxxxx.vercel.app`

---

## 🔄 **ÉTAPE 3: CONFIGURER CORS**

### **3.1 Mettre à jour CORS dans Railway**
1. Retourner sur Railway
2. Dans **"Variables"**, ajouter :
   ```
   CORS_ORIGINS = https://smart-excel-xxxxx.vercel.app
   ```
   *(Remplacer par votre URL Vercel)*

### **3.2 Redéployer le backend**
1. Dans Railway, aller dans **"Deployments"**
2. Cliquer **"Redeploy"**

---

## 🎉 **RÉSULTAT FINAL**

### **URLs de votre application :**
- **Frontend** : `https://smart-excel-xxxxx.vercel.app`
- **Backend** : `https://web-production-xxxxx.railway.app`

### **Test de l'application :**
1. Ouvrir l'URL frontend
2. Tester l'upload d'un fichier Excel
3. Tester une commande IA

---

## 🔧 **DÉPANNAGE COURANT**

### **❌ "CORS Error"**
**Solution :** Vérifier que `CORS_ORIGINS` contient l'URL Vercel exacte

### **❌ "API Error 500"**
**Solution :** Vérifier les logs Railway et la clé OpenAI

### **❌ "Build Failed"**
**Solution :** Vérifier que le `Root Directory` est bien configuré

---

## 📱 **PARTAGE DE L'APPLICATION**

Votre application est maintenant accessible depuis :
- ✅ **Ordinateurs** (tous navigateurs)
- ✅ **Téléphones** (responsive)
- ✅ **Tablettes** (adaptive)

**URL à partager :** `https://smart-excel-xxxxx.vercel.app`

---

## 🔄 **MISES À JOUR AUTOMATIQUES**

Maintenant, chaque fois que vous faites un `git push` :
- ✅ **Railway** redéploie automatiquement le backend
- ✅ **Vercel** redéploie automatiquement le frontend

**Workflow :**
```bash
git add .
git commit -m "Nouvelle fonctionnalité"
git push origin main
# → Déploiement automatique !
```

---

## 💰 **COÛTS**

- **Railway** : Gratuit (500h/mois)
- **Vercel** : Gratuit (100GB bandwidth/mois)
- **Total** : **0€** pour un usage normal !

---

## 📞 **SUPPORT**

- **Logs Railway** : Dashboard → Deployments → View Logs
- **Logs Vercel** : Dashboard → Functions → View Function Logs
- **GitHub Issues** : Pour signaler des bugs
