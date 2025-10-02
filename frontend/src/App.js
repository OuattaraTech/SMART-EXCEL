/**
 * Composant principal de l'application Excel AI Editor
 * Gère l'état global et la navigation entre les différentes vues
 */

import React, { useState, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Composants personnalisés
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import ExcelViewer from './components/ExcelViewer';
import AICommandPanel from './components/AICommandPanel';
import LoadingSpinner from './components/LoadingSpinner';

// Services
import { apiService } from './services/apiService';

// Thème Material-UI personnalisé
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
      light: '#9aa7f0',
      dark: '#4c63d2',
    },
    secondary: {
      main: '#764ba2',
      light: '#a47bc8',
      dark: '#5a3a7a',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

function App() {
  // États de l'application
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentFileName, setCurrentFileName] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  /**
   * Gère l'upload d'un nouveau fichier Excel
   */
  const handleFileUpload = useCallback(async (file) => {
    setLoading(true);
    try {
      const response = await apiService.uploadFile(file);
      
      if (response.success) {
        setExcelData(response.data);
        setCurrentFileName(response.filename);
        setHasUnsavedChanges(false);
        
        toast.success(`Fichier "${file.name}" chargé avec succès!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        throw new Error(response.error || 'Erreur lors du chargement');
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      toast.error(`Erreur lors du chargement: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Gère la mise à jour d'une cellule dans le tableau
   */
  const handleCellUpdate = useCallback(async (rowId, column, newValue) => {
    try {
      const response = await apiService.updateCell(rowId, column, newValue);
      
      if (response.success) {
        setHasUnsavedChanges(true);
        
        // Mettre à jour les données localement pour un feedback immédiat
        setExcelData(prevData => {
          const newData = { ...prevData };
          const rowIndex = newData.data.findIndex(row => row.id === rowId);
          if (rowIndex !== -1) {
            newData.data[rowIndex][column] = newValue;
          }
          return newData;
        });
        
        toast.success('Cellule mise à jour', {
          position: "bottom-right",
          autoClose: 1000,
        });
      } else {
        throw new Error(response.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur mise à jour cellule:', error);
      toast.error(`Erreur: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, []);

  /**
   * Gère les commandes IA en langage naturel
   */
  const handleAICommand = useCallback(async (command) => {
    if (!command.trim()) {
      toast.warning('Veuillez entrer une commande', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.processAICommand(command);
      
      if (response.success) {
        // Si des nouvelles données sont disponibles, les mettre à jour
        if (response.data) {
          setExcelData(response.data);
          setHasUnsavedChanges(true);
        }
        
        toast.success(response.message, {
          position: "top-right",
          autoClose: 4000,
        });
        
        return response;
      } else {
        throw new Error(response.message || 'Erreur lors du traitement de la commande');
      }
    } catch (error) {
      console.error('Erreur commande IA:', error);
      toast.error(`Erreur IA: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Gère l'export du fichier Excel modifié
   */
  const handleExport = useCallback(async () => {
    if (!excelData) {
      toast.warning('Aucun fichier à exporter', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const filename = `export_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`;
      await apiService.exportFile(filename);
      
      setHasUnsavedChanges(false);
      toast.success('Fichier exporté avec succès!', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Erreur export:', error);
      toast.error(`Erreur lors de l'export: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [excelData]);

  /**
   * Recharge les données depuis le serveur
   */
  const handleRefreshData = useCallback(async () => {
    if (!excelData) return;
    
    setLoading(true);
    try {
      const response = await apiService.getData();
      if (response.success) {
        setExcelData(response.data);
        toast.success('Données actualisées', {
          position: "bottom-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error('Erreur actualisation:', error);
      toast.error('Erreur lors de l\'actualisation', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [excelData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          {/* En-tête de l'application */}
          <Header 
            fileName={currentFileName}
            hasUnsavedChanges={hasUnsavedChanges}
            onExport={handleExport}
            onRefresh={handleRefreshData}
            hasData={!!excelData}
          />

          {/* Contenu principal */}
          <Box sx={{ mt: 3 }}>
            {!excelData ? (
              // Vue d'upload si aucun fichier n'est chargé
              <FileUploader 
                onFileUpload={handleFileUpload}
                loading={loading}
              />
            ) : (
              // Vue principale avec tableau et commandes IA
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Panneau de commandes IA */}
                <AICommandPanel 
                  onCommand={handleAICommand}
                  disabled={loading}
                />
                
                {/* Visualiseur Excel */}
                <ExcelViewer 
                  data={excelData}
                  onCellUpdate={handleCellUpdate}
                  loading={loading}
                />
              </Box>
            )}
          </Box>

          {/* Spinner de chargement global */}
          {loading && <LoadingSpinner />}
        </Container>
      </Box>

      {/* Notifications toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}

export default App;
