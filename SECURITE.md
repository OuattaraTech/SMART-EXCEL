# 🔐 Guide de Sécurité - SMART-EXCEL

## 🚨 **IMPORTANT : Protection des Clés API**

Votre clé API OpenAI est **confidentielle** et ne doit **JAMAIS** être partagée publiquement !

### ⚠️ **Ce qu'il NE faut PAS faire**
- ❌ Committer la clé API dans Git
- ❌ Partager la clé dans des messages publics
- ❌ L'inclure dans le code source
- ❌ La laisser dans des fichiers non protégés

### ✅ **Bonnes Pratiques**

#### **1. Utiliser des Variables d'Environnement**

**Windows :**
```bash
# Définir la variable pour la session
set OPENAI_API_KEY=votre-clé-ici

# Ou utiliser le script fourni
setup-env.bat
```

**macOS/Linux :**
```bash
# Définir la variable pour la session
export OPENAI_API_KEY=votre-clé-ici

# Ou l'ajouter à votre .bashrc/.zshrc
echo 'export OPENAI_API_KEY=votre-clé-ici' >> ~/.bashrc
```

#### **2. Créer un fichier .env local**

```bash
# Dans le dossier backend, créez un fichier .env
cd backend
cp env.example .env

# Éditez .env avec votre vraie clé API
# Le fichier .env est automatiquement ignoré par Git
```

#### **3. Configuration Sécurisée**

Le fichier `backend/config.py` utilise maintenant :
```python
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY') or 'your-openai-api-key-here'
```

Cela signifie que :
- Si la variable d'environnement existe → elle est utilisée
- Sinon → valeur par défaut (non fonctionnelle)

## 🔧 **Configuration Recommandée**

### **Pour le Développement Local**

1. **Créer le fichier .env :**
```bash
cd backend
echo "OPENAI_API_KEY=your-openai-api-key-here" > .env
```

2. **Charger les variables :**
```bash
# Windows
setup-env.bat

# macOS/Linux
source .env
```

### **Pour la Production**

1. **Serveur Web :** Configurez les variables d'environnement sur votre serveur
2. **Docker :** Utilisez des secrets Docker ou des variables d'environnement
3. **Cloud :** Utilisez les services de gestion de secrets (AWS Secrets, Azure Key Vault, etc.)

## 🛡️ **Sécurité Supplémentaire**

### **Rotation des Clés**
- Changez votre clé API régulièrement
- Surveillez l'utilisation sur le dashboard OpenAI
- Désactivez immédiatement une clé compromise

### **Limitations d'Usage**
- Configurez des limites de dépenses sur OpenAI
- Surveillez les logs d'utilisation
- Implémentez une authentification utilisateur

### **Monitoring**
- Surveillez les requêtes API suspectes
- Loggez les accès à l'application
- Alertes en cas d'usage anormal

## 📋 **Checklist de Sécurité**

Avant de déployer :

- [ ] ✅ Clé API dans variable d'environnement
- [ ] ✅ Fichier .env dans .gitignore
- [ ] ✅ Pas de secrets dans le code source
- [ ] ✅ HTTPS activé en production
- [ ] ✅ Authentification utilisateur (si nécessaire)
- [ ] ✅ Limites de taux configurées
- [ ] ✅ Monitoring activé
- [ ] ✅ Sauvegardes régulières

## 🚀 **Déploiement Sécurisé**

### **Heroku**
```bash
heroku config:set OPENAI_API_KEY=votre-clé-ici
```

### **AWS**
```bash
aws ssm put-parameter --name "/smartexcel/openai-key" --value "votre-clé-ici" --type "SecureString"
```

### **Docker**
```bash
docker run -e OPENAI_API_KEY=votre-clé-ici smart-excel
```

---

## 🆘 **En Cas de Compromission**

Si votre clé API est compromise :

1. **Immédiatement :**
   - Désactivez la clé sur OpenAI
   - Générez une nouvelle clé
   - Changez tous les mots de passe associés

2. **Vérifiez :**
   - Les logs d'utilisation OpenAI
   - Les accès à votre compte
   - Les dépenses inhabituelles

3. **Prévenez :**
   - Votre équipe si applicable
   - Surveillez les prochains jours

---

**🔒 La sécurité est la responsabilité de tous !**
