import { createContext, useCallback, useEffect, useState } from 'react';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';
import { Fail, Fails } from '@/types/Fail';
import { GlobalBan, GlobalBans } from '@/types/GlobalBan';
import { Jail } from '@/types/Jail';
import { StatsHistoryFormatted } from '@/types/StatHistoryFormatted';

type Fail2BanContextProps = {
  bans: Ban[] | undefined;
  refreshBans: () => void;
  jails: Jail[] | undefined;
  refreshJails: () => void;
  refreshJail: (name: string) => void;
  fails: Record<string, Fail[]> | undefined;
  globalBans: Record<string, GlobalBan[]> | undefined;
  stats: StatsHistoryFormatted | undefined;
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
  const [fails, setFails] = useState<Fails>();
  const [globalBans, setGlobalBans] = useState<GlobalBans>();
  const [stats, setStats] = useState<StatsHistoryFormatted>();
  const [healthBack, setHealthBack] = useState<boolean>(false);
  const [healthBan, setHealthBan] = useState<boolean>(false);

  const refreshBans = useCallback(async () => {
    const result = await Fail2BackService.getBans();
    setBans(result);
  }, []);

  const refreshFails = useCallback(async () => {
    const fails = await Fail2BackService.getFails();
    setFails(fails);
  }, []);

  const refreshGlobalBans = useCallback(async () => {
    const globalBans = await Fail2BackService.getGlobalBans();
    setGlobalBans(globalBans);
  }, []);

  const refreshStats = useCallback(async () => {
    const stats = await Fail2BackService.getStatHistoryFormatted();
    setStats(stats);
  }, []);

  const refreshJails = useCallback(async () => {
    console.log('refreshJails');

    const result = await Fail2BackService.getJails();
    setJails(result);

    result.forEach(() => {
      refreshFails();
      refreshGlobalBans();
      refreshStats();
    });
  }, [refreshFails, refreshGlobalBans, refreshStats]);

  const refreshJail = useCallback(async (name: string) => {
    console.log('refreshJail');

    const jails = await Fail2BackService.getJails();
    setJails(jails);

    const fails = await Fail2BackService.getFailsByJail(name);
    setFails((prev) => ({ ...prev, [name]: fails }));
    const globalBans = await Fail2BackService.getGlobalBansByJail(name);
    setGlobalBans((prev) => ({ ...prev, [name]: globalBans }));
    const stats = await Fail2BackService.getStatHistoryFormattedByJail(name);
    setStats((prev) => ({ ...prev, [name]: stats }));
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
