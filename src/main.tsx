import React from 'react';
import ReactDOM from 'react-dom/client';
import countries from 'i18n-iso-countries';
import LOCALE from 'i18n-iso-countries/langs/en.json';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { SnackbarProvider } from 'notistack';

import { AppContextProvider } from '@/context/app';
import { Fail2BanContextProvider } from '@/context/fail2ban';
import { IpContextProvider } from '@/context/ip';
import { Navigation } from '@/navigation/Navigation';
import CustomThemeProvider from '@/provider/ThemeProvider';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

TimeAgo.addDefaultLocale(en);
countries.registerLocale(LOCALE);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <AppContextProvider>
        <IpContextProvider>
          <CustomThemeProvider>
            <Fail2BanContextProvider>
              <Navigation />
            </Fail2BanContextProvider>
          </CustomThemeProvider>
        </IpContextProvider>
      </AppContextProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
