/**
 * Service API adapté pour mobile avec Capacitor
 * Gère les spécificités mobiles et la connectivité
 */

import axios from 'axios';

// Imports Capacitor avec gestion d'erreur
let Capacitor, Network, Toast, Filesystem, Directory, Encoding, Share;

try {
  // Essayer d'importer Capacitor et ses plugins
  const capacitorCore = require('@capacitor/core');
  Capacitor = capacitorCore.Capacitor;
  
  const networkPlugin = require('@capacitor/network');
  Network = networkPlugin.Network;
  
  const toastPlugin = require('@capacitor/toast');
  Toast = toastPlugin.Toast;
  
  const filesystemPlugin = require('@capacitor/filesystem');
  Filesystem = filesystemPlugin.Filesystem;
  Directory = filesystemPlugin.Directory;
  Encoding = filesystemPlugin.Encoding;
  
  const sharePlugin = require('@capacitor/share');
  Share = sharePlugin.Share;
  
  console.log('✅ Plugins Capacitor chargés avec succès');
} catch (error) {
  console.log('⚠️ Capacitor non disponible, mode web activé:', error.message);
  
  // Fallbacks pour le mode web
  Capacitor = {
    isNativePlatform: () => false,
    getPlatform: () => 'web'
  };
  
  Network = {
    getStatus: () => Promise.resolve({ connected: true, connectionType: 'wifi' })
  };
  
  Toast = {
    show: ({ text }) => {
      console.log('Toast (web):', text);
      // Fallback avec alert ou notification web
      if (typeof window !== 'undefined') {
        // Utiliser une notification web ou alert
        alert(text);
      }
      return Promise.resolve();
    }
  };
  
  Filesystem = {
    writeFile: () => Promise.reject(new Error('Filesystem non disponible en mode web')),
    readFile: () => Promise.reject(new Error('Filesystem non disponible en mode web'))
  };
  
  Share = {
    share: () => Promise.reject(new Error('Share non disponible en mode web'))
  };
}

// Détecter si on est sur mobile avec gestion d'erreur robuste
const isMobile = () => {
  try {
    // Vérifier si Capacitor est disponible globalement
    if (typeof window !== 'undefined' && window.Capacitor) {
      return window.Capacitor.isNativePlatform();
    }
    // Vérifier si Capacitor est importé
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform) {
      return Capacitor.isNativePlatform();
    }
    return false;
  } catch (error) {
    console.log('Capacitor non disponible, mode web activé');
    return false;
  }
};

// Obtenir l'URL de l'API selon la plateforme
const getApiUrl = () => {
  if (isMobile()) {
    // Sur mobile, essayer plusieurs URLs
    const possibleUrls = [
      'http://10.0.2.2:5000/api',      // Émulateur Android
      'http://192.168.1.100:5000/api', // IP locale (à adapter)
      'http://localhost:5000/api'       // Fallback
    ];
    // Pour l'instant, utiliser la première
    return possibleUrls[0];
  }
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

// Configuration d'Axios pour mobile
const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs réseau sur mobile
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Erreur API mobile:', error);
    
    if (isMobile()) {
      // Vérifier la connectivité réseau
      const status = await Network.getStatus();
      if (!status.connected) {
        await Toast.show({
          text: 'Pas de connexion internet',
          duration: 'long'
        });
        throw new Error('Pas de connexion internet');
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout - Le serveur met trop de temps à répondre');
    }
    
    if (error.response) {
      const message = error.response.data?.error || error.response.data?.message || 'Erreur serveur';
      throw new Error(message);
    } else if (error.request) {
      throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } else {
      throw new Error('Erreur de configuration de la requête');
    }
  }
);

export const mobileApiService = {
  /**
   * Vérifier la connectivité réseau
   */
  async checkConnectivity() {
    if (isMobile()) {
      const status = await Network.getStatus();
      return status.connected;
    }
    return true; // Supposer connecté sur web
  },

  /**
   * Upload un fichier Excel ou CSV vers le serveur
   */
  async uploadFile(file) {
    try {
      // Vérifier la connectivité
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Pas de connexion internet');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload: ${percentCompleted}%`);
          
          if (isMobile()) {
            Toast.show({
              text: `Upload: ${percentCompleted}%`,
              duration: 'short'
            });
          }
        },
      });

      if (isMobile()) {
        await Toast.show({
          text: 'Fichier uploadé avec succès !',
          duration: 'short'
        });
      }

      return response.data;
    } catch (error) {
      console.error('Erreur upload fichier mobile:', error);
      
      if (isMobile()) {
        await Toast.show({
          text: `Erreur upload: ${error.message}`,
          duration: 'long'
        });
      }
      
      throw error;
    }
  },

  /**
   * Récupère les données actuelles du fichier Excel
   */
  async getData() {
    try {
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Pas de connexion internet');
      }

      const response = await apiClient.get('/data');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération données mobile:', error);
      throw error;
    }
  },

  /**
   * Met à jour une cellule spécifique
   */
  async updateCell(rowId, column, value) {
    try {
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Pas de connexion internet');
      }

      const response = await apiClient.post('/update-cell', {
        rowId,
        column,
        value,
      });

      if (isMobile()) {
        await Toast.show({
          text: 'Cellule mise à jour',
          duration: 'short'
        });
      }

      return response.data;
    } catch (error) {
      console.error('Erreur mise à jour cellule mobile:', error);
      
      if (isMobile()) {
        await Toast.show({
          text: `Erreur: ${error.message}`,
          duration: 'long'
        });
      }
      
      throw error;
    }
  },

  /**
   * Traite une commande IA
   */
  async processAICommand(command) {
    try {
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Pas de connexion internet');
      }

      if (isMobile()) {
        await Toast.show({
          text: 'Traitement de la commande IA...',
          duration: 'short'
        });
      }

      const response = await apiClient.post('/ai-command', {
        command: command.trim(),
      });

      if (isMobile() && response.data.success) {
        await Toast.show({
          text: 'Commande IA exécutée !',
          duration: 'short'
        });
      }

      return response.data;
    } catch (error) {
      console.error('Erreur commande IA mobile:', error);
      
      if (isMobile()) {
        await Toast.show({
          text: `Erreur IA: ${error.message}`,
          duration: 'long'
        });
      }
      
      throw error;
    }
  },

  /**
   * Exporte le fichier Excel (adapté pour mobile)
   */
  async exportFile(filename = 'export.xlsx') {
    try {
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Pas de connexion internet');
      }

      if (isMobile()) {
        await Toast.show({
          text: 'Préparation de l\'export...',
          duration: 'short'
        });
      }

      const response = await apiClient.post('/export', 
        { filename },
        {
          responseType: 'blob',
        }
      );

      if (isMobile()) {
        // Sur mobile, sauvegarder dans le système de fichiers
        const base64Data = await this.blobToBase64(response.data);
        
        const savedFile = await Filesystem.writeFile({
          path: filename,
          data: base64Data,
          directory: Directory.Documents,
        });

        // Partager le fichier
        await Share.share({
          title: 'Fichier Excel exporté',
          text: 'Votre fichier Excel modifié',
          url: savedFile.uri,
          dialogTitle: 'Partager le fichier Excel'
        });

        await Toast.show({
          text: 'Fichier exporté et partagé !',
          duration: 'long'
        });
      } else {
        // Sur web, téléchargement classique
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erreur export fichier mobile:', error);
      
      if (isMobile()) {
        await Toast.show({
          text: `Erreur export: ${error.message}`,
          duration: 'long'
        });
      }
      
      throw error;
    }
  },

  /**
   * Convertit un Blob en Base64 (pour mobile)
   */
  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // Enlever le préfixe data:
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  },

  /**
   * Vérifie le statut du serveur
   */
  async getStatus() {
    try {
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        throw new Error('Pas de connexion internet');
      }

      const response = await apiClient.get('/status');
      return response.data;
    } catch (error) {
      console.error('Erreur statut serveur mobile:', error);
      throw error;
    }
  },

  /**
   * Teste la connexion avec le serveur
   */
  async testConnection() {
    try {
      const isConnected = await this.checkConnectivity();
      if (!isConnected) {
        return false;
      }

      await this.getStatus();
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Obtient des informations sur la plateforme
   */
  getPlatformInfo() {
    return {
      isMobile: isMobile(),
      platform: Capacitor.getPlatform(),
      apiUrl: getApiUrl(),
    };
  }
};

export default mobileApiService;
