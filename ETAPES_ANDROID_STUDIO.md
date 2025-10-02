# 📱 Étapes Détaillées Android Studio - SMART-EXCEL

## 🎯 **Vue d'Ensemble du Processus**

```
📱 SMART-EXCEL APK
├── 1️⃣ Prérequis (Node.js, Java, Android Studio)
├── 2️⃣ Préparation du projet React
├── 3️⃣ Configuration Capacitor
├── 4️⃣ Android Studio Setup
├── 5️⃣ Build APK
└── 6️⃣ Test et Distribution
```

---

## 1️⃣ **ÉTAPE 1 : Vérification des Prérequis**

### **🔍 Script de Vérification Automatique**
```bash
# Lancez ce script pour vérifier vos prérequis
check-prerequisites.bat
```

### **📋 Checklist Manuelle**
- [ ] **Node.js 16+** installé (`node --version`)
- [ ] **NPM** fonctionnel (`npm --version`)  
- [ ] **Java JDK 11+** installé (`java -version`)
- [ ] **Android Studio** installé avec SDK

### **🔧 Si des éléments manquent :**
1. **Node.js** : [https://nodejs.org](https://nodejs.org) → Version LTS
2. **Java JDK** : [https://adoptium.net](https://adoptium.net) → OpenJDK 11+
3. **Android Studio** : [https://developer.android.com/studio](https://developer.android.com/studio)

---

## 2️⃣ **ÉTAPE 2 : Préparation du Projet**

### **📂 Structure Attendue**
```
SMART-EXCEL/
├── frontend/          ← Votre code React
├── backend/           ← API Flask
├── build-apk.bat     ← Script automatique
└── GUIDE_ANDROID_STUDIO.md
```

### **⚙️ Commandes de Préparation**
```bash
# 1. Aller dans le frontend
cd frontend

# 2. Installer les dépendances React
npm install

# 3. Installer Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 4. Installer les plugins mobiles
npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network
```

---

## 3️⃣ **ÉTAPE 3 : Configuration Capacitor**

### **🚀 Initialisation**
```bash
# Initialiser Capacitor (si pas déjà fait)
npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
```

### **🏗️ Build React**
```bash
# Build de production de votre app React
npm run build
```

### **📱 Ajout de la Plateforme Android**
```bash
# Ajouter Android au projet
npx cap add android

# Synchroniser les fichiers
npx cap sync
```

### **✅ Vérification**
Après ces commandes, vous devriez avoir :
- ✅ Dossier `android/` créé dans `frontend/`
- ✅ Fichier `capacitor.config.ts` présent
- ✅ Build React dans `frontend/build/`

---

## 4️⃣ **ÉTAPE 4 : Android Studio**

### **🎯 Ouverture du Projet**

**Méthode 1 - Automatique :**
```bash
npx cap open android
```

**Méthode 2 - Manuelle :**
1. Ouvrez Android Studio
2. "Open an Existing Project"
3. Naviguez vers `SMART-EXCEL/frontend/android`
4. Sélectionnez le dossier `android`

### **⚙️ Configuration Initiale**

#### **4.1 Gradle Sync**
- Android Studio synchronise automatiquement
- Si demandé, cliquez "Sync Now"
- Attendez la fin (peut prendre quelques minutes)

#### **4.2 SDK Manager**
1. **Ouvrir** : `Tools` → `SDK Manager`
2. **SDK Platforms** :
   - ✅ Android 13 (API 33)
   - ✅ Android 12 (API 31)
3. **SDK Tools** :
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Platform-Tools
4. **Apply** pour télécharger

#### **4.3 Vérifier les Permissions**
Fichier : `app/src/main/AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

---

## 5️⃣ **ÉTAPE 5 : Build de l'APK**

### **🔨 APK de Debug (Test)**

#### **Méthode 1 - Interface Android Studio**
1. **Menu** : `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
2. **Attendez** la compilation
3. **Cliquez** sur "locate" dans la notification
4. **L'APK** est dans : `app/build/outputs/apk/debug/app-debug.apk`

#### **Méthode 2 - Terminal**
```bash
# Dans Android Studio : View → Tool Windows → Terminal
./gradlew assembleDebug
```

### **🏆 APK de Release (Production)**

#### **5.1 Créer une Clé de Signature**
1. **Menu** : `Build` → `Generate Signed Bundle / APK`
2. **Sélectionnez** : APK
3. **Create new keystore** :
   - **Key store path** : `smart-excel-keystore.jks`
   - **Password** : `smartexcel2024` (changez-le !)
   - **Key alias** : `smart-excel`
   - **Validity** : 25 years
   - **Remplissez** vos informations

#### **5.2 Générer l'APK Signé**
1. **Sélectionnez** votre keystore
2. **Entrez** les mots de passe
3. **Build Variants** : release
4. **Signature Versions** : V1 et V2
5. **Finish**

---

## 6️⃣ **ÉTAPE 6 : Test et Validation**

### **📱 Test sur Émulateur**

#### **6.1 Créer un Émulateur**
1. **AVD Manager** : `Tools` → `AVD Manager`
2. **Create Virtual Device**
3. **Choisir** : Pixel 4 ou similaire
4. **Image système** : API 31+ avec Google Play
5. **Finish**

#### **6.2 Lancer et Tester**
1. **Démarrer** l'émulateur
2. **Glisser-déposer** votre APK sur l'émulateur
3. **Tester** toutes les fonctionnalités

### **📲 Test sur Appareil Réel**

#### **6.1 Préparer l'Appareil**
1. **Mode Développeur** :
   - `Paramètres` → `À propos`
   - Tapez 7x sur "Numéro de build"
2. **Débogage USB** :
   - `Paramètres` → `Options développeur`
   - Activez "Débogage USB"

#### **6.2 Installer et Tester**
1. **Connecter** en USB
2. **Autoriser** le débogage
3. **Installer** l'APK
4. **Tester** toutes les fonctionnalités

---

## 🎨 **ÉTAPE 7 : Personnalisation (Optionnel)**

### **📱 Icône de l'Application**
1. **Préparer** vos icônes (PNG) :
   - 48x48, 72x72, 96x96, 144x144, 192x192
2. **Remplacer** dans `app/src/main/res/mipmap-*/`
3. **Ou utiliser** : Clic droit sur `app` → `New` → `Image Asset`

### **📝 Nom de l'Application**
Fichier : `app/src/main/res/values/strings.xml`
```xml
<string name="app_name">SMART-EXCEL</string>
```

### **🎨 Splash Screen**
Modifier : `app/src/main/res/drawable/splash.xml`

---

## 🚀 **ÉTAPE 8 : Distribution**

### **📤 Partage Direct**
- **APK Debug** : Pour tests internes
- **APK Release** : Pour distribution

### **🏪 Google Play Store**
1. **Compte développeur** : 25$ sur [Google Play Console](https://play.google.com/console)
2. **Préparer** :
   - Icône 512x512
   - Captures d'écran
   - Description
   - Politique de confidentialité
3. **Upload** et soumettre

---

## 🔧 **Résolution de Problèmes**

### **❌ Erreurs Courantes**

#### **"SDK not found"**
- **Solution** : `File` → `Project Structure` → `SDK Location`
- Vérifiez le chemin du SDK Android

#### **"Gradle sync failed"**
- **Solution** : `File` → `Invalidate Caches and Restart`
- Vérifiez votre connexion internet

#### **"Build failed"**
- **Vérifiez** les logs dans l'onglet "Build"
- **Clean** : `Build` → `Clean Project`
- **Rebuild** : `Build` → `Rebuild Project`

#### **APK trop volumineux**
- **Activer minification** dans `app/build.gradle`
- **Supprimer** les ressources inutiles

### **🆘 Support**
- **Logs détaillés** : Onglet "Build" dans Android Studio
- **Documentation** : [developer.android.com](https://developer.android.com)
- **Stack Overflow** : Pour erreurs spécifiques

---

## 📋 **Checklist Finale**

Avant de distribuer votre APK :

### **🧪 Tests**
- [ ] ✅ Fonctionne sur émulateur
- [ ] ✅ Fonctionne sur appareil réel
- [ ] ✅ Upload de fichiers Excel
- [ ] ✅ Commandes IA fonctionnelles
- [ ] ✅ Export de fichiers
- [ ] ✅ Interface responsive

### **🎨 Apparence**
- [ ] ✅ Icône personnalisée
- [ ] ✅ Nom d'application correct
- [ ] ✅ Splash screen
- [ ] ✅ Couleurs cohérentes

### **🔧 Technique**
- [ ] ✅ APK signé (pour release)
- [ ] ✅ Permissions correctes
- [ ] ✅ Taille acceptable (<50MB)
- [ ] ✅ Performance fluide

---

## 🎯 **Résumé des Commandes**

```bash
# Vérification
check-prerequisites.bat

# Préparation
cd frontend
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android

# Configuration
npm run build
npx cap add android
npx cap sync

# Android Studio
npx cap open android

# Dans Android Studio :
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

---

**🎉 Félicitations ! Vous avez maintenant une APK Android complète de SMART-EXCEL !**

**📱 L'APK sera générée dans :**
`frontend/android/app/build/outputs/apk/debug/app-debug.apk`
