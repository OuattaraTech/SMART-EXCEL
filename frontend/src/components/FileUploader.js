/**
 * Composant FileUploader - Interface de téléchargement de fichiers
 * Utilise react-dropzone pour une expérience utilisateur moderne
 */

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Description as FileIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const FileUploader = ({ onFileUpload, loading }) => {
  // Configuration de react-dropzone
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Gérer les fichiers rejetés
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles[0].errors;
      if (errors.some(error => error.code === 'file-invalid-type')) {
        alert('Format de fichier non supporté. Utilisez .xlsx, .xls ou .csv');
      } else if (errors.some(error => error.code === 'file-too-large')) {
        alert('Fichier trop volumineux. Taille maximum: 16MB');
      }
      return;
    }

    // Traiter le premier fichier accepté
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    maxSize: 16 * 1024 * 1024, // 16MB
    disabled: loading,
  });

  // Styles dynamiques selon l'état du drag & drop
  const getDropzoneStyles = () => {
    let borderColor = '#e0e0e0';
    let backgroundColor = 'rgba(255, 255, 255, 0.95)';
    
    if (isDragAccept) {
      borderColor = '#4caf50';
      backgroundColor = 'rgba(76, 175, 80, 0.05)';
    } else if (isDragReject) {
      borderColor = '#f44336';
      backgroundColor = 'rgba(244, 67, 54, 0.05)';
    } else if (isDragActive) {
      borderColor = '#2196f3';
      backgroundColor = 'rgba(33, 150, 243, 0.05)';
    }

    return {
      borderColor,
      backgroundColor,
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.6 : 1,
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        py: 6,
      }}
    >
      {/* Zone de drop principal */}
      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 6,
          textAlign: 'center',
          border: '2px dashed',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          ...getDropzoneStyles(),
          '&:hover': {
            transform: loading ? 'none' : 'translateY(-2px)',
            boxShadow: loading ? undefined : '0 8px 25px rgba(0,0,0,0.15)',
          },
        }}
      >
        <input {...getInputProps()} />
        
        <Box sx={{ mb: 3 }}>
          <UploadIcon 
            sx={{ 
              fontSize: 64, 
              color: isDragAccept ? 'success.main' : 
                     isDragReject ? 'error.main' : 
                     'primary.main',
              mb: 2,
            }} 
          />
        </Box>

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {isDragActive ? (
            isDragAccept ? 'Déposez le fichier ici' : 'Format non supporté'
          ) : (
            'Glissez-déposez votre fichier Excel'
          )}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          ou cliquez pour sélectionner un fichier
        </Typography>

        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          disabled={loading}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            px: 4,
            py: 1.5,
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          {loading ? 'Chargement...' : 'Sélectionner un fichier'}
        </Button>
      </Paper>

      {/* Informations sur les formats supportés */}
      <Paper
        elevation={1}
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon color="primary" />
          Formats supportés
        </Typography>
        
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="success" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="Excel (.xlsx, .xls)" 
              secondary="Fichiers Microsoft Excel modernes et anciens"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CheckIcon color="success" fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="CSV (.csv)" 
              secondary="Fichiers de valeurs séparées par des virgules"
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          <strong>Taille maximum:</strong> 16 MB<br />
          <strong>Fonctionnalités:</strong> Édition en temps réel, commandes IA, export Excel
        </Typography>
      </Paper>

      {/* Exemples de commandes IA */}
      <Paper
        elevation={1}
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          🤖 Exemples de commandes IA
        </Typography>
        
        <List dense>
          {[
            'Calcule la somme de la colonne B',
            'Ajoute une colonne TVA à 20%',
            'Filtre les lignes où le prix > 100',
            'Trie par ordre croissant de date',
            'Calcule la moyenne des ventes',
          ].map((example, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <FileIcon color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={`"${example}"`}
                primaryTypographyProps={{ 
                  fontStyle: 'italic',
                  color: 'text.secondary'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default FileUploader;
