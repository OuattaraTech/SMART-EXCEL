/**
 * Point d'entrée de l'application React
 * Configure et démarre l'application Excel AI Editor
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Créer le root de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application avec gestion d'erreur
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Gestion des erreurs non capturées
window.addEventListener('unhandledrejection', (event) => {
  console.error('Erreur non gérée:', event.reason);
  // En production, vous pourriez envoyer l'erreur à un service de monitoring
});

// Gestion des erreurs JavaScript
window.addEventListener('error', (event) => {
  console.error('Erreur JavaScript:', event.error);
  // En production, vous pourriez envoyer l'erreur à un service de monitoring
});
