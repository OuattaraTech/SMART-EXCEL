/**
 * Composant LoadingSpinner - Indicateur de chargement global
 * Affiche un overlay avec spinner pendant les opérations longues
 */

import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
} from '@mui/material';

const LoadingSpinner = ({ message = 'Chargement en cours...' }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
      }}
      open={true}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          p: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'white',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
          }}
        >
          Veuillez patienter...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingSpinner;
