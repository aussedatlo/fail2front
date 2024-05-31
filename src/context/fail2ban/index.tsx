import { createContext, useCallback, useEffect, useState } from 'react';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';
import { Jail } from '@/types/Jail';

type Fail2BanContextProps = {
  isLoaded: boolean;
  bans: Ban[] | undefined;
  jails: Jail[] | undefined;
};

const initialFail2BanContext: Fail2BanContextProps = {
  isLoaded: false,
  bans: [],
  jails: [],
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [bans, setBans] = useState<Ban[]>();
  const [jails, getJails] = useState<Jail[]>();

  const refreshBans = useCallback(async () => {
    const result = await Fail2BackService.getBans();
    setBans(result);
  }, []);

  const refreshJails = useCallback(async () => {
    const result = await Fail2BackService.getJails();
    getJails(result);
  }, []);

  useEffect(() => {
    Promise.all([refreshBans(), refreshJails()]).then(() => {
      setIsLoaded(true);
    });
  }, [refreshBans, refreshJails]);

  return (
    <Fail2BanContext.Provider value={{ isLoaded, bans, jails }}>
      {children}
    </Fail2BanContext.Provider>
  );
};
