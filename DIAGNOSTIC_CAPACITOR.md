# 🔍 Diagnostic des Erreurs Capacitor - Frontend

## ❌ **Problèmes Identifiés**

### **1. Node.js Non Installé**
```
npm : Le terme 'npm' n'est pas reconnu
```
**Impact :** Impossible d'installer les dépendances Capacitor

### **2. Dossier node_modules Manquant**
**Observation :** Pas de dossier `node_modules/` dans `frontend/`
**Impact :** Aucune dépendance installée, y compris Capacitor

### **3. Dossier android/ Absent**
**Observation :** Pas de dossier `android/` généré par Capacitor
**Impact :** Impossible de générer l'APK

### **4. Imports Capacitor Non Résolus**
Dans `mobileApiService.js` :
```javascript
import { Capacitor } from '@capacitor/core';        // ❌ Module non installé
import { Network } from '@capacitor/network';       // ❌ Module non installé
import { Toast } from '@capacitor/toast';           // ❌ Module non installé
```

### **5. Configuration TypeScript**
Le fichier `capacitor.config.ts` utilise TypeScript mais pas de configuration TS

## 🛠️ **Plan de Correction**

### **Étape 1 : Installer Node.js**
1. Télécharger depuis [nodejs.org](https://nodejs.org)
2. Installer la version LTS
3. Redémarrer l'ordinateur

### **Étape 2 : Installer les Dépendances**
```bash
cd frontend
npm install
```

### **Étape 3 : Ajouter Capacitor**
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/filesystem @capacitor/share @capacitor/toast @capacitor/network
```

### **Étape 4 : Initialiser Capacitor**
```bash
npx cap init "SMART-EXCEL" "com.ouattaratech.smartexcel"
```

### **Étape 5 : Build et Sync**
```bash
npm run build
npx cap add android
npx cap sync
```
