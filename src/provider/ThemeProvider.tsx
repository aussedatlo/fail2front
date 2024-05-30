import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

type ThemeProviderProps = {
  children: ReactNode;
};

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: React.PropsWithChildren) => {
  return <ThemeProvider theme={{}}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
