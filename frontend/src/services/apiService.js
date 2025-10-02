/**
 * Service API pour communiquer avec le backend Flask
 * Centralise toutes les requêtes HTTP vers l'API
 */

import axios from 'axios';

// Configuration de base d'Axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 secondes de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs globalement
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout - Le serveur met trop de temps à répondre');
    }
    
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      const message = error.response.data?.error || error.response.data?.message || 'Erreur serveur';
      throw new Error(message);
    } else if (error.request) {
      // La requête a été envoyée mais pas de réponse
      throw new Error('Impossible de contacter le serveur. Vérifiez que le backend est démarré.');
    } else {
      // Erreur dans la configuration de la requête
      throw new Error('Erreur de configuration de la requête');
    }
  }
);

export const apiService = {
  /**
   * Upload un fichier Excel ou CSV vers le serveur
   * @param {File} file - Le fichier à uploader
   * @returns {Promise<Object>} Réponse avec les données du fichier
   */
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // Callback pour suivre le progrès d'upload (optionnel)
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload: ${percentCompleted}%`);
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erreur upload fichier:', error);
      throw error;
    }
  },

  /**
   * Récupère les données actuelles du fichier Excel
   * @returns {Promise<Object>} Données du tableau
   */
  async getData() {
    try {
      const response = await apiClient.get('/data');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération données:', error);
      throw error;
    }
  },

  /**
   * Met à jour une cellule spécifique dans le tableau
   * @param {number} rowId - ID de la ligne
   * @param {string} column - Nom de la colonne
   * @param {any} value - Nouvelle valeur
   * @returns {Promise<Object>} Confirmation de la mise à jour
   */
  async updateCell(rowId, column, value) {
    try {
      const response = await apiClient.post('/update-cell', {
        rowId,
        column,
        value,
      });
      return response.data;
    } catch (error) {
      console.error('Erreur mise à jour cellule:', error);
      throw error;
    }
  },

  /**
   * Envoie une commande en langage naturel à l'IA
   * @param {string} command - Commande à traiter
   * @returns {Promise<Object>} Résultat du traitement IA
   */
  async processAICommand(command) {
    try {
      const response = await apiClient.post('/ai-command', {
        command: command.trim(),
      });
      return response.data;
    } catch (error) {
      console.error('Erreur commande IA:', error);
      throw error;
    }
  },

  /**
   * Exporte le fichier Excel modifié
   * @param {string} filename - Nom du fichier à exporter
   * @returns {Promise<void>} Déclenche le téléchargement
   */
  async exportFile(filename = 'export.xlsx') {
    try {
      const response = await apiClient.post('/export', 
        { filename },
        {
          responseType: 'blob', // Important pour les fichiers binaires
        }
      );

      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      // Nettoyer
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error('Erreur export fichier:', error);
      throw error;
    }
  },

  /**
   * Vérifie le statut du serveur
   * @returns {Promise<Object>} Informations sur le statut
   */
  async getStatus() {
    try {
      const response = await apiClient.get('/status');
      return response.data;
    } catch (error) {
      console.error('Erreur statut serveur:', error);
      throw error;
    }
  },

  /**
   * Teste la connexion avec le serveur
   * @returns {Promise<boolean>} True si la connexion fonctionne
   */
  async testConnection() {
    try {
      await this.getStatus();
      return true;
    } catch (error) {
      return false;
    }
  },
};

// Fonctions utilitaires pour la gestion des erreurs
export const errorHandler = {
  /**
   * Formate un message d'erreur pour l'affichage utilisateur
   * @param {Error} error - L'erreur à formater
   * @returns {string} Message d'erreur formaté
   */
  formatError(error) {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error.message) {
      return error.message;
    }
    
    return 'Une erreur inattendue s\'est produite';
  },

  /**
   * Détermine si une erreur est liée à la connectivité
   * @param {Error} error - L'erreur à analyser
   * @returns {boolean} True si c'est une erreur de connectivité
   */
  isConnectionError(error) {
    const message = error.message?.toLowerCase() || '';
    return message.includes('network') || 
           message.includes('timeout') || 
           message.includes('contacter le serveur');
  },
};

export default apiService;
