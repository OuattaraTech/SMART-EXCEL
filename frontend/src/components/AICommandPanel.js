/**
 * Composant AICommandPanel - Interface pour les commandes IA
 * Permet à l'utilisateur d'envoyer des commandes en langage naturel
 */

import React, { useState, useCallback } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Send as SendIcon,
  AutoAwesome as AIIcon,
  Help as HelpIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
} from '@mui/icons-material';

const AICommandPanel = ({ onCommand, disabled }) => {
  const [command, setCommand] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  // Exemples de commandes prédéfinies
  const commandExamples = [
    {
      category: 'Calculs',
      commands: [
        'Calcule la somme de la colonne B',
        'Calcule la moyenne des prix',
        'Trouve le maximum de la colonne ventes',
        'Compte le nombre de lignes non vides',
      ]
    },
    {
      category: 'Modifications',
      commands: [
        'Ajoute une colonne TVA à 20%',
        'Multiplie la colonne prix par 1.1',
        'Convertis les dates au format français',
        'Remplace les valeurs vides par 0',
      ]
    },
    {
      category: 'Filtres et tri',
      commands: [
        'Filtre les lignes où le prix > 100',
        'Trie par ordre croissant de date',
        'Affiche uniquement les ventes de janvier',
        'Supprime les doublons',
      ]
    },
  ];

  // Gestionnaire de soumission de commande
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!command.trim() || disabled || isLoading) {
      return;
    }

    setIsLoading(true);
    setLastResult(null);

    try {
      const result = await onCommand(command.trim());
      setLastResult(result);
      
      // Vider le champ si la commande a réussi
      if (result && result.success) {
        setCommand('');
      }
    } catch (error) {
      setLastResult({
        success: false,
        message: error.message || 'Erreur lors du traitement de la commande'
      });
    } finally {
      setIsLoading(false);
    }
  }, [command, onCommand, disabled, isLoading]);

  // Gestionnaire pour utiliser un exemple de commande
  const handleUseExample = useCallback((exampleCommand) => {
    setCommand(exampleCommand);
    setShowExamples(false);
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        border: '1px solid rgba(102, 126, 234, 0.1)',
      }}
    >
      {/* En-tête */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <AIIcon />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Assistant IA
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Décrivez ce que vous voulez faire avec vos données
          </Typography>
        </Box>

        <IconButton
          onClick={() => setShowExamples(!showExamples)}
          sx={{ color: 'primary.main' }}
        >
          <HelpIcon />
        </IconButton>
      </Box>

      {/* Formulaire de commande */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Ex: Calcule la somme de la colonne B, Ajoute une colonne TVA à 18%, Filtre les lignes où le prix > 50..."
            disabled={disabled || isLoading}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                },
              },
            }}
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={!command.trim() || disabled || isLoading}
            startIcon={isLoading ? null : <SendIcon />}
            sx={{
              minWidth: 120,
              height: 56,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
              '&:disabled': {
                background: '#e0e0e0',
              },
            }}
          >
            {isLoading ? 'Traitement...' : 'Envoyer'}
          </Button>
        </Box>
      </Box>

      {/* Résultat de la dernière commande */}
      {lastResult && (
        <Alert
          severity={lastResult.success ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {lastResult.message}
        </Alert>
      )}

      {/* Exemples de commandes */}
      <Collapse in={showExamples}>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Exemples de commandes
            </Typography>
            <IconButton
              size="small"
              onClick={() => setShowExamples(false)}
            >
              {showExamples ? <CollapseIcon /> : <ExpandIcon />}
            </IconButton>
          </Box>

          {commandExamples.map((category, categoryIndex) => (
            <Box key={categoryIndex} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                color="primary"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                {category.category}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {category.commands.map((cmd, cmdIndex) => (
                  <Chip
                    key={cmdIndex}
                    label={cmd}
                    variant="outlined"
                    size="small"
                    onClick={() => handleUseExample(cmd)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'primary.50',
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                ))}
              </Box>
              
              {categoryIndex < commandExamples.length - 1 && (
                <Divider sx={{ mt: 2 }} />
              )}
            </Box>
          ))}

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              💡 <strong>Astuce:</strong> Soyez précis dans vos commandes. 
              Mentionnez les noms exacts des colonnes tels qu'ils apparaissent dans votre tableau.
            </Typography>
          </Alert>
        </Box>
      </Collapse>

      {/* Bouton pour afficher/masquer les exemples */}
      {!showExamples && (
        <Button
          variant="text"
          startIcon={<HelpIcon />}
          onClick={() => setShowExamples(true)}
          sx={{ mt: 1 }}
        >
          Voir des exemples de commandes
        </Button>
      )}
    </Paper>
  );
};

export default AICommandPanel;
