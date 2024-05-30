import React from 'react';
import ReactDOM from 'react-dom/client';

import { Fail2BanContextProvider } from '@/context/fail2ban';
import { Navigation } from '@/navigation/Navigation';
import CustomThemeProvider from '@/provider/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <Fail2BanContextProvider>
        <>
          <Navigation />
        </>
      </Fail2BanContextProvider>
    </CustomThemeProvider>
  </React.StrictMode>,
);
