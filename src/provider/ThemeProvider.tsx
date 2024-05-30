import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

type ThemeProviderProps = {
  children: ReactNode;
};

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
