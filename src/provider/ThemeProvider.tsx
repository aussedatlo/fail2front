import React, { ReactNode, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AppContext } from '@/context/app';

const darkTheme = createTheme({
  typography: {
    fontFamily: ['Roboto'].join(','),
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    primary: {
      main: '#00bfa5',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

const lightTheme = createTheme({
  typography: {
    fontFamily: ['Roboto'].join(','),
  },
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

type ThemeProviderProps = {
  children: ReactNode;
};

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: React.PropsWithChildren) => {
  const { theme } = useContext(AppContext);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
