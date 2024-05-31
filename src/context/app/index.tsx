import { createContext, useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | undefined;

type AppContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialAppContext: AppContextProps = {
  theme: undefined,
  setTheme: () => {},
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

type AppContextProviderProps = {
  children: React.ReactElement;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>();

  const updateTheme = useCallback((theme: Theme) => {
    if (!theme) return;

    localStorage.setItem('theme', theme);
    setTheme(theme);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme as 'light' | 'dark');
    } else {
      updateTheme('dark');
    }
  }, [updateTheme]);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme: updateTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
