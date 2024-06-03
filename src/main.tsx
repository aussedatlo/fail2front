import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { SnackbarProvider } from 'notistack';

import { AppContextProvider } from '@/context/app';
import { Fail2BanContextProvider } from '@/context/fail2ban';
import { IpContextProvider } from '@/context/ip';
import { Navigation } from '@/navigation/Navigation';
import CustomThemeProvider from '@/provider/ThemeProvider';
import { AppBar } from '@/view/appBar/AppBar';

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <AppContextProvider>
        <IpContextProvider>
          <CustomThemeProvider>
            <Fail2BanContextProvider>
              <>
                <AppBar />
                <Navigation />
              </>
            </Fail2BanContextProvider>
          </CustomThemeProvider>
        </IpContextProvider>
      </AppContextProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
