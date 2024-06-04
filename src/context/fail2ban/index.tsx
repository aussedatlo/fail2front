import { createContext, useCallback, useEffect, useState } from 'react';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';
import { Fail } from '@/types/Fail';
import { GlobalBan } from '@/types/GlobalBan';
import { Jail } from '@/types/Jail';

type Fail2BanContextProps = {
  isLoaded: boolean;
  bans: Ban[] | undefined;
  refreshBans: () => void;
  jails: Jail[] | undefined;
  refreshJails: () => void;
  refreshJail: (jail: Jail) => void;
  fails: Record<string, Fail[]> | undefined;
  globalBans: Record<string, GlobalBan[]> | undefined;
  healthBack: boolean;
  healthBan: boolean;
};

const initialFail2BanContext: Fail2BanContextProps = {
  isLoaded: false,
  bans: [],
  refreshBans: () => {},
  jails: [],
  refreshJails: () => {},
  refreshJail: () => {},
  fails: {},
  globalBans: {},
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
  const [fails, setFails] = useState<Record<string, Fail[]>>({});
  const [globalBans, setGlobalBans] = useState<Record<string, GlobalBan[]>>({});
  const [healthBack, setHealthBack] = useState<boolean>(false);
  const [healthBan, setHealthBan] = useState<boolean>(false);

  const refreshBans = useCallback(async () => {
    const result = await Fail2BackService.getBans();
    setBans(result);
  }, []);

  const refreshJails = useCallback(async () => {
    const result = await Fail2BackService.getJails();

    result.map(async (jail) => {
      const fails = await Fail2BackService.getFails(jail.name);
      setFails((prev) => ({ ...prev, [jail.name]: fails }));
      const globalBans = await Fail2BackService.getGlobalBans(jail.name);
      setGlobalBans((prev) => ({ ...prev, [jail.name]: globalBans }));
    });

    setJails(result);
  }, []);

  const refreshJail = useCallback(async (jail: Jail) => {
    const fails = await Fail2BackService.getFails(jail.name);
    setFails((prev) => ({ ...prev, [jail.name]: fails }));
    const globalBans = await Fail2BackService.getGlobalBans(jail.name);
    setGlobalBans((prev) => ({ ...prev, [jail.name]: globalBans }));
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
      value={{
        isLoaded,
        bans,
        refreshBans,
        jails,
        refreshJails,
        refreshJail,
        fails,
        globalBans,
        healthBack,
        healthBan,
      }}
    >
      {children}
    </Fail2BanContext.Provider>
  );
};
