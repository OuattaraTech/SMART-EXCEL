# 📱 Guide Complet Android Studio - SMART-EXCEL APK

Ce guide vous accompagne étape par étape pour créer une APK Android de votre application SMART-EXCEL avec Android Studio.

## 🔧 **ÉTAPE 1 : Installation des Prérequis**

### **1.1 Installer Node.js**
1. **Téléchargez Node.js** : [https://nodejs.org](https://nodejs.org)
2. **Choisissez la version LTS** (Long Term Support)
3. **Installez** avec les options par défaut
4. **Redémarrez** votre ordinateur
5. **Vérifiez** l'installation :
   ```bash
   node --version
   npm --version
   ```

### **1.2 Installer Android Studio**
1. **Téléchargez** : [https://developer.android.com/studio](https://developer.android.com/studio)
2. **Installez** Android Studio
3. **Lors du premier lancement** :
   - Choisissez "Standard" setup
   - Laissez télécharger le SDK Android
   - Acceptez les licences

### **1.3 Installer Java JDK**
1. **Téléchargez Java 11+** : [https://adoptium.net](https://adoptium.net)
2. **Installez** avec les options par défaut
3. **Vérifiez** : `java -version`

## 🚀 **ÉTAPE 2 : Préparation du Projet**

### **2.1 Cloner et Configurer**
```bash
# Cloner votre projet depuis GitHub
git clone https://github.com/OuattaraTech/SMART-EXCEL.git
cd SMART-EXCEL

# Configurer votre clé API OpenAI
set OPENAI_API_KEY=your-openai-api-key-here
```

### **2.2 Installer les Dépendances Frontend**
```bash
cd frontend
npm install
```

### **2.3 Installer Capacitor**
```bash
# Installer Capacitor et les plugins
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network @capacitor/status-bar @capacitor/keyboard
```

## 📱 **ÉTAPE 3 : Configuration Capacitor**

### **3.1 Initialiser Capacitor**
```bash
# Initialiser Capacitor (si pas déjà fait)
npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
```

### **3.2 Build de l'Application React**
```bash
# Build de production
npm run build
```

### **3.3 Ajouter la Plateforme Android**
```bash
# Ajouter Android
npx cap add android

# Synchroniser les fichiers
npx cap sync
```

## 🔧 **ÉTAPE 4 : Configuration Android Studio**

### **4.1 Ouvrir le Projet dans Android Studio**
```bash
# Ouvrir Android Studio avec le projet
npx cap open android
```

**OU manuellement :**
1. Ouvrez Android Studio
2. Cliquez sur "Open an Existing Project"
3. Naviguez vers `SMART-EXCEL/frontend/android`
4. Sélectionnez le dossier `android` et cliquez "OK"

### **4.2 Configuration du SDK Android**

1. **Ouvrir SDK Manager** :
   - Menu : `Tools` → `SDK Manager`
   - Ou icône SDK Manager dans la toolbar

2. **SDK Platforms** (onglet) :
   - ✅ Cochez `Android 13 (API 33)` ou plus récent
   - ✅ Cochez `Android 12 (API 31)` pour compatibilité
   - Cliquez "Apply" pour télécharger

3. **SDK Tools** (onglet) :
   - ✅ `Android SDK Build-Tools`
   - ✅ `Android Emulator`
   - ✅ `Android SDK Platform-Tools`
   - ✅ `Google Play services`

### **4.3 Configuration du Projet**

1. **Gradle Sync** :
   - Android Studio devrait automatiquement synchroniser
   - Si pas, cliquez sur "Sync Now" dans la notification

2. **Vérifier les Permissions** :
   - Ouvrez `app/src/main/AndroidManifest.xml`
   - Vérifiez que ces permissions sont présentes :
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
   ```

## 🏗️ **ÉTAPE 5 : Build de l'APK**

### **5.1 Build APK de Debug (Test)**

1. **Menu Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**

2. **Ou via Gradle** :
   - Ouvrez le terminal dans Android Studio : `View` → `Tool Windows` → `Terminal`
   - Tapez : `./gradlew assembleDebug`

3. **Localiser l'APK** :
   - L'APK sera dans : `app/build/outputs/apk/debug/app-debug.apk`
   - Android Studio affichera un lien "locate" dans la notification

### **5.2 Build APK de Release (Production)**

#### **5.2.1 Créer une Clé de Signature**
1. **Menu Build** → **Generate Signed Bundle / APK**
2. Choisissez **APK**
3. Cliquez **Create new...**
4. **Remplissez les informations** :
   - Key store path : `smart-excel-keystore.jks`
   - Password : `smartexcel123` (changez-le !)
   - Key alias : `smart-excel`
   - Validity : 25 years
   - Certificate info : Vos informations

#### **5.2.2 Générer l'APK Signé**
1. **Sélectionnez votre keystore**
2. **Entrez les mots de passe**
3. **Choisissez "release"**
4. **Cochez "V1" et "V2" Signature Versions**
5. **Cliquez "Finish"**

## 📲 **ÉTAPE 6 : Test de l'APK**

### **6.1 Test sur Émulateur**

1. **Créer un Émulateur** :
   - `Tools` → `AVD Manager`
   - `Create Virtual Device`
   - Choisissez un appareil (ex: Pixel 4)
   - Sélectionnez une image système (API 31+)
   - Cliquez "Finish"

2. **Lancer l'Émulateur** :
   - Cliquez sur le bouton "Play" de votre AVD

3. **Installer l'APK** :
   - Glissez-déposez votre APK sur l'émulateur
   - Ou utilisez : `adb install app-debug.apk`

### **6.2 Test sur Appareil Réel**

1. **Activer le Mode Développeur** sur votre téléphone :
   - `Paramètres` → `À propos du téléphone`
   - Tapez 7 fois sur "Numéro de build"

2. **Activer le Débogage USB** :
   - `Paramètres` → `Options de développement`
   - Activez "Débogage USB"

3. **Connecter et Installer** :
   - Connectez votre téléphone en USB
   - Autorisez le débogage USB
   - Glissez-déposez l'APK ou utilisez `adb install`

## 🎨 **ÉTAPE 7 : Personnalisation (Optionnel)**

### **7.1 Changer l'Icône de l'App**

1. **Préparez vos icônes** (format PNG) :
   - 48x48 (mdpi)
   - 72x72 (hdpi)
   - 96x96 (xhdpi)
   - 144x144 (xxhdpi)
   - 192x192 (xxxhdpi)

2. **Remplacez dans** `app/src/main/res/mipmap-*/ic_launcher.png`

3. **Ou utilisez l'outil Android Studio** :
   - Clic droit sur `app` → `New` → `Image Asset`
   - Choisissez votre image source
   - Android Studio génère toutes les tailles

### **7.2 Changer le Nom de l'App**

Éditez `app/src/main/res/values/strings.xml` :
```xml
<resources>
    <string name="app_name">SMART-EXCEL</string>
    <string name="title_activity_main">SMART-EXCEL</string>
</resources>
```

### **7.3 Splash Screen**

Éditez `app/src/main/res/drawable/splash.xml` pour personnaliser l'écran de démarrage.

## 🚀 **ÉTAPE 8 : Publication (Optionnel)**

### **8.1 Google Play Store**

1. **Créer un compte développeur** : [https://play.google.com/console](https://play.google.com/console) (25$ une fois)

2. **Préparer les assets** :
   - Icône haute résolution (512x512)
   - Captures d'écran (téléphone, tablette)
   - Description de l'app
   - Politique de confidentialité

3. **Upload de l'APK** :
   - Créez une nouvelle application
   - Uploadez votre APK signé
   - Remplissez toutes les informations
   - Soumettez pour révision

## 🔧 **Résolution de Problèmes Courants**

### **Erreur : "SDK not found"**
- Vérifiez que le SDK Android est installé
- `File` → `Project Structure` → `SDK Location`

### **Erreur : "Gradle sync failed"**
- Vérifiez votre connexion internet
- `File` → `Invalidate Caches and Restart`

### **Erreur : "Build failed"**
- Vérifiez les logs dans l'onglet "Build"
- Assurez-vous que toutes les dépendances sont installées

### **APK trop volumineux**
- Activez la minification dans `app/build.gradle` :
```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 📋 **Checklist Finale**

Avant de distribuer votre APK :

- [ ] ✅ APK testé sur émulateur
- [ ] ✅ APK testé sur appareil réel
- [ ] ✅ Toutes les fonctionnalités marchent
- [ ] ✅ Icône et nom personnalisés
- [ ] ✅ Permissions correctes
- [ ] ✅ APK signé pour la production
- [ ] ✅ Taille de l'APK acceptable
- [ ] ✅ Performance satisfaisante

## 🎯 **Résumé des Commandes Clés**

```bash
# Préparation
cd frontend
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android

# Build et configuration
npm run build
npx cap add android
npx cap sync

# Ouvrir Android Studio
npx cap open android

# Dans Android Studio : Build → Build Bundle(s) / APK(s) → Build APK(s)
```

---

**🎉 Félicitations ! Vous avez maintenant une APK Android de votre application SMART-EXCEL !**

L'APK sera générée dans : `frontend/android/app/build/outputs/apk/debug/app-debug.apk`
