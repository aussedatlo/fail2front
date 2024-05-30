import React, { ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: React.PropsWithChildren) => {
  return <>{children}</>;
};

export default CustomThemeProvider;
