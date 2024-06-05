import { createContext, useCallback, useEffect, useState } from 'react';
import { Layouts } from 'react-grid-layout';

import {
  DEFAULT_ALL_EMPTY_LAYOUTS,
  DEFAULT_EMPTY_LAYOUTS,
  DEFAULT_IP_LAYOUTS,
  DEFAULT_JAIL_LAYOUTS,
  LayoutType,
} from '@/constants/layout';

export type Theme = 'light' | 'dark' | undefined;

type AppContextProps = {
  isLoaded: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  layouts: Record<LayoutType, Layouts>;
  setLayouts: (updatedLayouts: Layouts, type: LayoutType) => void;
};

const initialAppContext: AppContextProps = {
  isLoaded: false,
  theme: undefined,
  setTheme: () => {},
  layouts: DEFAULT_ALL_EMPTY_LAYOUTS,
  setLayouts: () => {},
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

type AppContextProviderProps = {
  children: React.ReactElement;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>();
  const [layouts, setLayouts] = useState<Record<LayoutType, Layouts>>(
    DEFAULT_ALL_EMPTY_LAYOUTS,
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const updateTheme = useCallback((theme: Theme) => {
    if (!theme) return;

    localStorage.setItem('theme', theme);
    setTheme(theme);
  }, []);

  const updateLayouts = useCallback(
    (updatedLayouts: Layouts, type: LayoutType) => {
      if (!updatedLayouts) return;

      const allLayouts = { ...layouts, [type]: updatedLayouts };
      localStorage.setItem('layouts', JSON.stringify(allLayouts));
      setLayouts(allLayouts);
    },
    [layouts],
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme as 'light' | 'dark');
    } else {
      updateTheme('dark');
    }

    const layouts = localStorage.getItem('layouts');
    if (layouts) {
      setLayouts(JSON.parse(layouts));
    } else {
      setLayouts({
        jail: DEFAULT_JAIL_LAYOUTS,
        dashboard: DEFAULT_IP_LAYOUTS,
        ip: DEFAULT_EMPTY_LAYOUTS,
      });
    }

    setIsLoaded(true);
  }, [updateTheme]);

  return (
    <AppContext.Provider
      value={{
        isLoaded,
        theme,
        setTheme: updateTheme,
        layouts,
        setLayouts: updateLayouts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
