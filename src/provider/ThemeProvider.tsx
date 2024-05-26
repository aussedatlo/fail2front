import React, { ReactNode } from 'react';
import { theme } from 'antd';
import { ThemeProvider } from 'styled-components';

type ThemeProviderProps = {
  children: ReactNode;
};

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: React.PropsWithChildren) => {
  const { token } = theme.useToken();
  return (
    <ThemeProvider theme={{ antd: token, base: { color: 'mediumseagreen' } }}>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
