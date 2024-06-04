import { createContext, useCallback, useEffect, useState } from 'react';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';
import { Fail } from '@/types/Fail';
import { GlobalBan } from '@/types/GlobalBan';
import { Jail } from '@/types/Jail';
import { StatHistoryFormatted } from '@/types/StatHistoryFormatted';

type Fail2BanContextProps = {
  bans: Ban[] | undefined;
  refreshBans: () => void;
  jails: Jail[] | undefined;
  refreshJails: () => void;
  refreshJail: (jail: Jail) => void;
  fails: Record<string, Fail[]> | undefined;
  globalBans: Record<string, GlobalBan[]> | undefined;
  stats: Record<string, StatHistoryFormatted> | undefined;
  healthBack: boolean;
  healthBan: boolean;
};

const initialFail2BanContext: Fail2BanContextProps = {
  bans: undefined,
  refreshBans: () => {},
  jails: undefined,
  refreshJails: () => {},
  refreshJail: () => {},
  fails: undefined,
  globalBans: undefined,
  stats: undefined,
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
  const [bans, setBans] = useState<Ban[]>();
  const [jails, setJails] = useState<Jail[]>();
  const [fails, setFails] = useState<Record<string, Fail[]>>();
  const [globalBans, setGlobalBans] = useState<Record<string, GlobalBan[]>>();
  const [stats, setStats] = useState<Record<string, StatHistoryFormatted>>();
  const [healthBack, setHealthBack] = useState<boolean>(false);
  const [healthBan, setHealthBan] = useState<boolean>(false);

  const refreshBans = useCallback(async () => {
    const result = await Fail2BackService.getBans();
    setBans(result);
  }, []);

  const refreshFails = useCallback(async (jail: Jail) => {
    const fails = await Fail2BackService.getFails(jail.name);
    setFails((prev) => ({ ...prev, [jail.name]: fails }));
  }, []);

  const refreshGlobalBans = useCallback(async (jail: Jail) => {
    const globalBans = await Fail2BackService.getGlobalBans(jail.name);
    setGlobalBans((prev) => ({ ...prev, [jail.name]: globalBans }));
  }, []);

  const refreshStats = useCallback(async (jail: Jail) => {
    const stats = await Fail2BackService.getStatHistoryFormatted(jail.name);
    setStats((prev) => ({ ...prev, [jail.name]: stats }));
  }, []);

  const refreshJails = useCallback(async () => {
    const result = await Fail2BackService.getJails();

    setJails(result);

    result.forEach((jail) => {
      refreshFails(jail);
      refreshGlobalBans(jail);
      refreshStats(jail);
    });
  }, [refreshFails, refreshGlobalBans, refreshStats]);

  useEffect(() => {
    console.log('Fail2BanContextProvider useEffect');
    console.log(stats);
  }, [stats]);

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
    Promise.all([refreshHealth(), refreshBans(), refreshJails()]);

    const timer = setInterval(() => {
      refreshHealth();
    }, 5000);

    return () => clearInterval(timer);
  }, [refreshBans, refreshJails, refreshHealth]);

  return (
    <Fail2BanContext.Provider
      value={{
        bans,
        refreshBans,
        jails,
        refreshJails,
        refreshJail,
        fails,
        globalBans,
        stats,
        healthBack,
        healthBan,
      }}
    >
      {children}
    </Fail2BanContext.Provider>
  );
};
