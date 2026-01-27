import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';

import App from './App';
import { store } from './app/store';
import { queryClient } from './app/queryClient';
import AuthInitializer from './app/AuthInitializer';
import { CustomThemeProvider } from './theme/CustomThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <CssBaseline />
          <AuthInitializer>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthInitializer>
        </CustomThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);