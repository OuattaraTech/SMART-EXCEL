# 🔧 Solutions aux Erreurs Capacitor - SMART-EXCEL

## 🚨 **Erreurs Courantes et Solutions**

### **1. "npm n'est pas reconnu"**
```
npm : Le terme 'npm' n'est pas reconnu comme nom d'applet de commande
```

**🔧 Solution :**
1. Installer Node.js depuis [nodejs.org](https://nodejs.org)
2. Choisir la version LTS (Long Term Support)
3. Redémarrer l'ordinateur
4. Vérifier : `node --version` et `npm --version`

---

### **2. "Module '@capacitor/core' not found"**
```
Error: Cannot resolve module '@capacitor/core'
```

**🔧 Solution :**
```bash
cd frontend
npm install @capacitor/core @capacitor/cli
```

---

### **3. "capacitor.config.ts not found"**

**🔧 Solution :**
```bash
cd frontend
npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
```

---

### **4. "Android platform not found"**

**🔧 Solution :**
```bash
cd frontend
npm run build
npx cap add android
npx cap sync
```

---

### **5. Erreurs d'imports Capacitor en mode web**
```javascript
import { Capacitor } from '@capacitor/core'; // ❌ Erreur si non installé
```

**🔧 Solution :** Utiliser les imports conditionnels (déjà corrigé dans `mobileApiService.js`)

---

### **6. "Build failed" lors de npm run build**

**🔧 Solutions possibles :**
1. **Nettoyer le cache :**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Vérifier les dépendances :**
   ```bash
   npm audit fix
   ```

3. **Mettre à jour React Scripts :**
   ```bash
   npm update react-scripts
   ```

---

### **7. "Java JDK not found" (Android Studio)**

**🔧 Solution :**
1. Installer Java JDK 11 ou 17
2. Configurer JAVA_HOME :
   ```bash
   set JAVA_HOME=C:\Program Files\Java\jdk-17
   ```
3. Ajouter au PATH : `%JAVA_HOME%\bin`

---

### **8. "Android SDK not found"**

**🔧 Solution :**
1. Installer Android Studio
2. Ouvrir SDK Manager
3. Installer Android SDK Platform 33+
4. Configurer ANDROID_HOME :
   ```bash
   set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   ```

---

## 🛠️ **Scripts de Correction Automatique**

### **Diagnostic Complet**
```bash
diagnostic-frontend.bat
```

### **Correction Automatique**
```bash
fix-capacitor-errors.bat
```

### **Vérification Prérequis**
```bash
check-prerequisites.bat
```

---

## 📱 **Génération APK - Étapes Complètes**

### **1. Prérequis**
- ✅ Node.js installé
- ✅ Java JDK 11+ installé
- ✅ Android Studio installé

### **2. Installation**
```bash
cd frontend
npm install
```

### **3. Configuration Capacitor**
```bash
npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
```

### **4. Build et Sync**
```bash
npm run build
npx cap add android
npx cap sync
```

### **5. Ouvrir Android Studio**
```bash
npx cap open android
```

### **6. Générer APK**
Dans Android Studio :
1. **Build** → **Generate Signed Bundle / APK**
2. Choisir **APK**
3. Créer ou utiliser un keystore
4. **Build**

---

## 🔍 **Vérification Post-Installation**

### **Test des Imports**
```javascript
// Test dans la console du navigateur
console.log(window.Capacitor ? 'Capacitor OK' : 'Mode Web');
```

### **Test des Plugins**
```javascript
// Test Network
if (window.Capacitor) {
  import('@capacitor/network').then(({ Network }) => {
    Network.getStatus().then(status => console.log('Network:', status));
  });
}
```

---

## 📞 **Support**

Si les erreurs persistent :
1. Vérifier les logs détaillés
2. Consulter la documentation Capacitor
3. Vérifier les versions de compatibilité

**Versions recommandées :**
- Node.js: 18+ LTS
- Capacitor: 5.x
- Android SDK: 33+
- Java JDK: 11 ou 17
