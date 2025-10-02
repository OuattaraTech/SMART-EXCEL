/**
 * Composant ExcelViewer - Affichage et édition du tableau Excel
 * Utilise AG-Grid pour une expérience utilisateur riche
 */

import React, { useMemo, useCallback, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const ExcelViewer = ({ data, onCellUpdate, loading }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gridApi, setGridApi] = useState(null);

  // Configuration des colonnes pour AG-Grid
  const columnDefs = useMemo(() => {
    if (!data || !data.columns) return [];

    return data.columns.map(col => ({
      field: col.field,
      headerName: col.headerName,
      editable: col.editable && !loading,
      sortable: true,
      filter: true,
      resizable: true,
      width: col.width || 150,
      minWidth: 100,
      // Configuration spéciale pour la colonne ID
      ...(col.field === 'id' && {
        pinned: 'left',
        cellStyle: { backgroundColor: '#f5f5f5', fontWeight: 'bold' },
        editable: false,
      }),
      // Formatage des nombres
      ...(col.field !== 'id' && {
        valueFormatter: (params) => {
          if (params.value === null || params.value === undefined || params.value === '') {
            return '';
          }
          // Si c'est un nombre, le formater
          if (typeof params.value === 'number') {
            return params.value.toLocaleString('fr-FR');
          }
          return params.value;
        },
      }),
    }));
  }, [data, loading]);

  // Configuration par défaut des colonnes
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: !loading,
  }), [loading]);

  // Gestionnaire de modification de cellule
  const onCellValueChanged = useCallback((event) => {
    const { data: rowData, colDef, newValue, oldValue } = event;
    
    // Ne pas traiter si la valeur n'a pas changé
    if (newValue === oldValue) return;
    
    // Ne pas traiter la colonne ID
    if (colDef.field === 'id') return;

    // Appeler la fonction de mise à jour
    onCellUpdate(rowData.id, colDef.field, newValue);
  }, [onCellUpdate]);

  // Gestionnaire d'initialisation de la grille
  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    // Auto-ajuster les colonnes
    params.api.sizeColumnsToFit();
  }, []);

  // Basculer le mode plein écran
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // Gestionnaire de redimensionnement
  const onGridSizeChanged = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  if (!data) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Aucune donnée à afficher
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        right: isFullscreen ? 0 : 'auto',
        bottom: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 9999 : 'auto',
        width: isFullscreen ? '100vw' : '100%',
        height: isFullscreen ? '100vh' : 'auto',
        borderRadius: isFullscreen ? 0 : 2,
        overflow: 'hidden',
      }}
    >
      {/* En-tête du tableau */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Données Excel
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              size="small"
              label={`${data.rowCount} lignes`}
              color="primary"
              variant="outlined"
            />
            <Chip
              size="small"
              label={`${data.colCount} colonnes`}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Les cellules sont éditables - double-cliquez pour modifier">
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}>
            <IconButton onClick={toggleFullscreen} size="small">
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Message d'information */}
      {!loading && (
        <Alert 
          severity="info" 
          sx={{ 
            m: 2, 
            mb: 0,
            '& .MuiAlert-message': { fontSize: '0.875rem' }
          }}
        >
          💡 Double-cliquez sur une cellule pour l'éditer. Les modifications sont sauvegardées automatiquement.
        </Alert>
      )}

      {/* Grille AG-Grid */}
      <Box
        sx={{
          height: isFullscreen ? 'calc(100vh - 120px)' : 600,
          width: '100%',
          p: 2,
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          rowData={data.data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}
          onCellValueChanged={onCellValueChanged}
          
          // Options d'affichage
          animateRows={true}
          rowSelection="single"
          enableCellTextSelection={true}
          
          // Options d'édition
          singleClickEdit={false}
          stopEditingWhenCellsLoseFocus={true}
          
          // Pagination
          pagination={true}
          paginationPageSize={50}
          paginationAutoPageSize={false}
          
          // Localisation française
          localeText={{
            // Pagination
            page: 'Page',
            more: 'Plus',
            to: 'à',
            of: 'sur',
            next: 'Suivant',
            last: 'Dernier',
            first: 'Premier',
            previous: 'Précédent',
            
            // Filtres
            filterOoo: 'Filtrer...',
            equals: 'Égal à',
            notEqual: 'Différent de',
            lessThan: 'Inférieur à',
            greaterThan: 'Supérieur à',
            contains: 'Contient',
            notContains: 'Ne contient pas',
            startsWith: 'Commence par',
            endsWith: 'Finit par',
            
            // Tri
            sortAscending: 'Tri croissant',
            sortDescending: 'Tri décroissant',
            sortUnSort: 'Annuler le tri',
            
            // Autres
            noRowsToShow: 'Aucune donnée à afficher',
            loading: 'Chargement...',
          }}
          
          // Styles personnalisés
          getRowStyle={(params) => {
            // Alternance de couleurs pour les lignes
            if (params.rowIndex % 2 === 0) {
              return { backgroundColor: '#fafafa' };
            }
            return null;
          }}
          
          // Désactiver si en cours de chargement
          suppressClickEdit={loading}
          suppressCellSelection={loading}
        />
      </Box>

      {/* Overlay de chargement */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Chargement en cours...
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ExcelViewer;
