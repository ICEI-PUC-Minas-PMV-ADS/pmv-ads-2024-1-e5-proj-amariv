import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { AppProvider } from './contexts/AuthContext/AppProvider';
import { ThemeProvider, createTheme } from '@mui/material';
import { ptBR } from "@mui/x-date-pickers/locales";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme(
  {
    palette: {
      primary: { main: '#53735B' },
    },
  },
  ptBR
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);


