import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import { AppContextProvider } from '@/context/app';
import { Fail2BanContextProvider } from '@/context/fail2ban';
import { Navigation } from '@/navigation/Navigation';
import CustomThemeProvider from '@/provider/ThemeProvider';
import { AppBar } from '@/view/appBar/AppBar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <AppContextProvider>
        <CustomThemeProvider>
          <Fail2BanContextProvider>
            <>
              <AppBar />
              <Navigation />
            </>
          </Fail2BanContextProvider>
        </CustomThemeProvider>
      </AppContextProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
