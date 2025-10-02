# 📱 Guide de Création d'APK pour SMART-EXCEL

Ce guide vous explique comment créer une application mobile Android (APK) à partir de votre application web SMART-EXCEL.

## 🎯 **Méthode Recommandée : Capacitor**

Capacitor permet de wrapper votre application React existante dans une WebView mobile native.

### **Prérequis**
- ✅ Node.js 16+ installé
- ✅ Android Studio installé
- ✅ Java JDK 11+ installé
- ✅ Votre application SMART-EXCEL fonctionnelle

## 📦 **Étape 1 : Installation de Capacitor**

```bash
# Aller dans le dossier frontend de votre projet
cd frontend

# Installer Capacitor
npm install @capacitor/core @capacitor/cli

# Initialiser Capacitor
npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"

# Installer les plugins Android
npm install @capacitor/android
```

## 🔧 **Étape 2 : Configuration de Capacitor**

Créer le fichier `capacitor.config.ts` dans le dossier `frontend` :

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ouattaratech.smartexcel',
  appName: 'SMART-EXCEL',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#667eea",
      showSpinner: false
    }
  }
};

export default config;
```

## 🏗️ **Étape 3 : Adapter le Code pour Mobile**

### Modifier `frontend/src/services/apiService.js` :

```javascript
// Détecter si on est sur mobile
const isMobile = () => {
  return window.Capacitor && window.Capacitor.isNativePlatform();
};

// Adapter l'URL de l'API
const getApiUrl = () => {
  if (isMobile()) {
    // Sur mobile, utiliser l'IP de votre serveur de développement
    return 'http://192.168.1.100:5000/api'; // Remplacez par votre IP
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

// Modifier la configuration d'Axios
const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Ajouter des plugins mobiles utiles :

```bash
# Plugins pour fonctionnalités mobiles
npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network
```

## 📱 **Étape 4 : Build et Génération Android**

```bash
# Build de l'application React
npm run build

# Ajouter la plateforme Android
npx cap add android

# Synchroniser les fichiers
npx cap sync

# Ouvrir dans Android Studio
npx cap open android
```

## 🔧 **Étape 5 : Configuration Android Studio**

1. **Android Studio s'ouvre automatiquement**
2. **Configurer le SDK** :
   - File → Project Structure → SDK Location
   - Vérifier que le SDK Android est configuré

3. **Configurer les permissions** dans `android/app/src/main/AndroidManifest.xml` :

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.NETWORK_STATE" />
```

## 🚀 **Étape 6 : Générer l'APK**

### **APK de Debug (Test)**
```bash
# Dans Android Studio
Build → Build Bundle(s) / APK(s) → Build APK(s)

# Ou en ligne de commande
cd android
./gradlew assembleDebug
```

### **APK de Release (Production)**
```bash
# Générer une clé de signature
keytool -genkey -v -keystore smart-excel-key.keystore -alias smart-excel -keyalg RSA -keysize 2048 -validity 10000

# Configurer dans android/app/build.gradle
# Puis build release
./gradlew assembleRelease
```

## 🎨 **Étape 7 : Personnalisation Mobile**

### **Icône de l'Application**
Placez vos icônes dans `android/app/src/main/res/` :
- `mipmap-hdpi/ic_launcher.png` (72x72)
- `mipmap-mdpi/ic_launcher.png` (48x48)
- `mipmap-xhdpi/ic_launcher.png` (96x96)
- `mipmap-xxhdpi/ic_launcher.png` (144x144)
- `mipmap-xxxhdpi/ic_launcher.png` (192x192)

### **Splash Screen**
Modifier `android/app/src/main/res/drawable/splash.xml`

### **Nom de l'Application**
Modifier `android/app/src/main/res/values/strings.xml` :

```xml
<resources>
    <string name="app_name">SMART-EXCEL</string>
    <string name="title_activity_main">SMART-EXCEL</string>
    <string name="package_name">com.ouattaratech.smartexcel</string>
    <string name="custom_url_scheme">com.ouattaratech.smartexcel</string>
</resources>
```

## 🔄 **Workflow de Développement Mobile**

```bash
# 1. Modifier le code React
# 2. Build
npm run build

# 3. Synchroniser
npx cap sync

# 4. Tester sur émulateur/appareil
npx cap run android

# 5. Générer APK final
cd android && ./gradlew assembleRelease
```

## 📊 **Adaptations Spécifiques pour SMART-EXCEL**

### **1. Gestion des Fichiers Excel**
```javascript
// Utiliser le plugin Filesystem pour sauvegarder
import { Filesystem, Directory } from '@capacitor/filesystem';

const saveExcelFile = async (data, filename) => {
  try {
    await Filesystem.writeFile({
      path: filename,
      data: data,
      directory: Directory.Documents,
    });
    
    // Partager le fichier
    import { Share } from '@capacitor/share';
    await Share.share({
      title: 'Fichier Excel exporté',
      url: filename,
    });
  } catch (error) {
    console.error('Erreur sauvegarde:', error);
  }
};
```

### **2. Interface Adaptée Mobile**
```css
/* Ajouter dans src/index.css */
@media (max-width: 768px) {
  .ag-theme-alpine {
    font-size: 14px;
  }
  
  .MuiButton-root {
    min-width: 44px;
    min-height: 44px;
  }
  
  /* Interface tactile optimisée */
  .ag-cell {
    padding: 8px 4px;
  }
}
```

### **3. Backend Mobile-Friendly**
Pour que l'app mobile fonctionne, vous devez :

1. **Héberger le backend** sur un serveur accessible (Heroku, AWS, etc.)
2. **Ou configurer un serveur local** accessible via IP
3. **Modifier l'URL de l'API** dans la configuration mobile

## 🌐 **Option Alternative : PWA (Plus Simple)**

Si vous voulez une solution plus simple sans APK :

```bash
# Ajouter le support PWA
npm install --save-dev workbox-webpack-plugin

# Modifier public/manifest.json
{
  "short_name": "SMART-EXCEL",
  "name": "SMART-EXCEL - Éditeur Excel IA",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff"
}
```

## 📦 **Fichiers APK Générés**

Après le build, vous trouverez vos APK dans :
- **Debug** : `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release** : `android/app/build/outputs/apk/release/app-release.apk`

## 🧪 **Test de l'APK**

```bash
# Installer sur un appareil Android connecté
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Ou glisser-déposer l'APK sur un émulateur Android
```

## 🚀 **Publication sur Google Play Store**

1. **Créer un compte développeur** Google Play (25$ une fois)
2. **Signer l'APK** avec une clé de release
3. **Uploader** sur Google Play Console
4. **Remplir les métadonnées** (description, captures d'écran, etc.)
5. **Soumettre** pour révision

## 🆘 **Résolution de Problèmes**

### **Erreur CORS sur Mobile**
```javascript
// Ajouter dans backend/app.py
CORS(app, origins=["capacitor://localhost", "https://localhost", "*"])
```

### **Problème de Réseau**
```javascript
// Vérifier la connectivité
import { Network } from '@capacitor/network';

const checkConnection = async () => {
  const status = await Network.getStatus();
  if (!status.connected) {
    alert('Pas de connexion internet');
  }
};
```

---

## 🎯 **Résumé des Étapes**

1. ✅ **Installer Capacitor** dans le projet frontend
2. ✅ **Configurer** pour Android
3. ✅ **Adapter le code** pour mobile
4. ✅ **Build** l'application React
5. ✅ **Générer l'APK** avec Android Studio
6. ✅ **Tester** sur appareil/émulateur
7. ✅ **Publier** sur Google Play Store (optionnel)

**🎉 Votre application SMART-EXCEL sera disponible en APK Android !**
