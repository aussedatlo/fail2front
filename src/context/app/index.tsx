import { createContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

type AppContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialAppContext: AppContextProps = {
  theme: 'light',
  setTheme: () => {},
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

type AppContextProviderProps = {
  children: React.ReactElement;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme as 'light' | 'dark');
    }
  }, [setTheme]);

  useEffect(() => {
    console.log('theme updated', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};
