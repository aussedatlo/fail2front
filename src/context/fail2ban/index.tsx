import { createContext, useCallback, useEffect, useState } from 'react';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';
import { Jail } from '@/types/Jail';

type Fail2BanContextProps = {
  isLoaded: boolean;
  bans: Ban[] | undefined;
  jails: Jail[] | undefined;
  healthBack: boolean;
  healthBan: boolean;
};

const initialFail2BanContext: Fail2BanContextProps = {
  isLoaded: false,
  bans: [],
  jails: [],
  healthBack: false,
  healthBan: false,
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
  const [jails, setJails] = useState<Jail[]>();
  const [healthBack, setHealthBack] = useState<boolean>(false);
  const [healthBan, setHealthBan] = useState<boolean>(false);

  const refreshBans = useCallback(async () => {
    const result = await Fail2BackService.getBans();
    setBans(result);
  }, []);

  const refreshJails = useCallback(async () => {
    const result = await Fail2BackService.getJails();
    setJails(result);
  }, []);

  const refreshHealth = useCallback(async () => {
    console.log('refreshHealth');
    const healthBack = await Fail2BackService.getHealthBack();
    const healthBan = await Fail2BackService.getHealthBan();
    setHealthBack(healthBack);
    setHealthBan(healthBan);
  }, []);

  useEffect(() => {
    Promise.all([refreshHealth(), refreshBans(), refreshJails()]).then(() => {
      setIsLoaded(true);
    });

    const timer = setInterval(() => {
      refreshHealth();
    }, 5000);

    return () => clearInterval(timer);
  }, [refreshBans, refreshJails, refreshHealth]);

  return (
    <Fail2BanContext.Provider
      value={{ isLoaded, bans, jails, healthBack, healthBan }}
    >
      {children}
    </Fail2BanContext.Provider>
  );
};
