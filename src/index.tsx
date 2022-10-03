import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './redux/store';
import { FireAuthProviders } from './components';
import './App.css';

import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routing } from './components/Routing/Routing';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <FireAuthProviders>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <StoreProvider store={store}>
          <Routing/>
        </StoreProvider>
      </ThemeProvider>
    </FireAuthProviders>
  </React.StrictMode>
);
