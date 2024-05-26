import React from 'react';
import ReactDOM from 'react-dom/client';

import { Navigation } from '@/navigation/Navigation';

import { Fail2BanContextProvider } from './context/fail2ban';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Fail2BanContextProvider>
      <Navigation />
    </Fail2BanContextProvider>
  </React.StrictMode>,
);
