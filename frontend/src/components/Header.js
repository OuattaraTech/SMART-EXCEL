/**
 * Composant Header - En-tête de l'application
 * Affiche le titre, le nom du fichier actuel et les actions principales
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  GetApp as ExportIcon,
  Refresh as RefreshIcon,
  TableChart as TableIcon,
  AutoAwesome as AIIcon,
} from '@mui/icons-material';

const Header = ({ 
  fileName, 
  hasUnsavedChanges, 
  onExport, 
  onRefresh, 
  hasData 
}) => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        color: 'text.primary',
        borderRadius: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo et titre */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <TableIcon />
            <AIIcon />
          </Box>
          
          <Box>
            <Typography 
              variant="h6" 
              component="h1"
              sx={{ 
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Excel AI Editor
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ display: 'block', mt: -0.5 }}
            >
              Édition intelligente de fichiers Excel
            </Typography>
          </Box>
        </Box>

        {/* Informations sur le fichier actuel */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {fileName && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Fichier:
              </Typography>
              <Chip
                label={fileName}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ maxWidth: 200 }}
              />
              {hasUnsavedChanges && (
                <Chip
                  label="Non sauvegardé"
                  size="small"
                  color="warning"
                  variant="filled"
                />
              )}
            </Box>
          )}

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {hasData && (
              <>
                <Tooltip title="Actualiser les données">
                  <IconButton
                    onClick={onRefresh}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'primary.50',
                      },
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>

                <Button
                  variant="contained"
                  startIcon={<ExportIcon />}
                  onClick={onExport}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    },
                  }}
                >
                  Exporter
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
