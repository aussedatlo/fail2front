import { createContext, useCallback, useEffect, useState } from 'react';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';

type Fail2BanContextProps = {
  bans: Ban[] | undefined;
  refreshBans: () => void;
};

const initialFail2BanContext: Fail2BanContextProps = {
  bans: [],
  refreshBans: () => {},
};

export const Fail2BanContext = createContext<Fail2BanContextProps>(
  initialFail2BanContext,
);

type Fail2BanContextProviderProps = {
  children: React.ReactElement;
};

export const Fail2BanContextProvider: React.FC<
  Fail2BanContextProviderProps
> = ({ children }: Fail2BanContextProviderProps) => {
  const [bans, setBans] = useState<Ban[]>();

  const refreshBans = useCallback(async () => {
    const result = await Fail2BackService.getBans();
    setBans(result);
  }, []);

  useEffect(() => {
    refreshBans();
  });

  return (
    <Fail2BanContext.Provider value={{ bans, refreshBans }}>
      {children}
    </Fail2BanContext.Provider>
  );
};
