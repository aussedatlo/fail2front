import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';
import { FailsRecord } from '@/types/Fail';
import { GlobalBansRecord } from '@/types/GlobalBan';
import { Jail } from '@/types/Jail';
import { StatsHistoryFormatted as StatsHistoryFormattedRecord } from '@/types/StatHistoryFormatted';

type State = {
  bans: Ban[];
  jails: Jail[];
  fails: FailsRecord;
  globalBans: GlobalBansRecord;
  stats: StatsHistoryFormattedRecord;
  healthBack: boolean;
  healthBan: boolean;
};

type Fail2BanContextProps = {
  refreshBans: () => void;
  refreshJails: () => void;
  refreshJail: (name: string) => void;
} & State;

const initialFail2BanContext: Fail2BanContextProps = {
  bans: [],
  jails: [],
  fails: {},
  globalBans: {},
  stats: {},
  healthBack: false,
  healthBan: false,
  refreshBans: () => {},
  refreshJails: () => {},
  refreshJail: () => {},
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
  const [bans, setBans] = useState<Ban[]>([]);
  const [jails, setJails] = useState<Jail[]>([]);
  const [fails, setFails] = useState<FailsRecord>({});
  const [globalBans, setGlobalBans] = useState<GlobalBansRecord>({});
  const [stats, setStats] = useState<StatsHistoryFormattedRecord>({});
  const [healthBack, setHealthBack] = useState<boolean>(false);
  const [healthBan, setHealthBan] = useState<boolean>(false);

  /**
   * Refreshes the bans for all jails
   */
  const refreshBans = useCallback(async () => {
    const result = await Fail2BackService.getBans();
    setBans(result);
  }, []);

  /**
   * Refreshes the fails for all jails
   */
  const refreshFails = useCallback(async () => {
    const fails = await Fail2BackService.getFails();
    setFails(fails);
  }, []);

  /**
   * Refreshes the global bans for all jails
   */
  const refreshGlobalBans = useCallback(async () => {
    const globalBans = await Fail2BackService.getGlobalBans();
    setGlobalBans(globalBans);
  }, []);

  /**
   * Refreshes the stats for all jails
   */
  const refreshStats = useCallback(async () => {
    const stats = await Fail2BackService.getStatHistoryFormatted();
    setStats(stats);
  }, []);

  /**
   * Refreshes all the jails
   */
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

  /**
   * Refreshes the fails of a specific jail
   */
  const refreshFailsByJail = useCallback(async (name: string) => {
    const fails = await Fail2BackService.getFailsByJail(name);
    setFails((prev) => ({ ...prev, [name]: fails }));
  }, []);

  /**
   * Refreshes the global bans of a specific jail
   */
  const refreshGlobalBansByJail = useCallback(async (name: string) => {
    const globalBans = await Fail2BackService.getGlobalBansByJail(name);
    setGlobalBans((prev) => ({ ...prev, [name]: globalBans }));
  }, []);

  /**
   * Refreshes the stats of a specific jail
   */
  const refreshStatsByJail = useCallback(async (name: string) => {
    const stats = await Fail2BackService.getStatHistoryFormattedByJail(name);
    setStats((prev) => ({ ...prev, [name]: stats }));
  }, []);

  /**
   * Refreshes all the data of a specific jail
   */
  const refreshJail = useCallback(
    async (name: string) => {
      console.log('refreshJail');

      const jails = await Fail2BackService.getJails();
      setJails(jails);

      refreshFailsByJail(name);
      refreshGlobalBansByJail(name);
      refreshStatsByJail(name);
    },
    [refreshFailsByJail, refreshGlobalBansByJail, refreshStatsByJail],
  );

  /**
   * Refreshes the health status of the back and ban services
   */
  const refreshHealth = useCallback(async () => {
    console.log('refreshHealth');
    const healthBack = await Fail2BackService.getHealthBack();
    const healthBan = await Fail2BackService.getHealthBan();
    setHealthBack(healthBack);
    setHealthBan(healthBan);
  }, []);

  /**
   * Refreshes the health status of the back and ban service in background
   */
  useEffect(() => {
    Promise.all([refreshHealth(), refreshBans(), refreshJails()]);

    const timer = setInterval(() => {
      refreshHealth();
    }, 5000);

    return () => clearInterval(timer);
  }, [refreshBans, refreshJails, refreshHealth]);

  const state = useMemo<State>(
    () => ({
      bans,
      jails,
      fails,
      globalBans,
      stats,
      healthBack,
      healthBan,
    }),
    [bans, jails, fails, globalBans, stats, healthBack, healthBan],
  );

  useEffect(() => {
    console.log('Fail2BanContextProvider state:', state);
  }, [state]);

  const [debouncedState] = useDebounce<State>(state, 500);

  useEffect(() => {
    console.log('Fail2BanContextProvider debouncedState:', debouncedState);
  }, [debouncedState]);

  return (
    <Fail2BanContext.Provider
      value={{
        jails: debouncedState.jails,
        bans: debouncedState.bans,
        fails: debouncedState.fails,
        globalBans: debouncedState.globalBans,
        stats: debouncedState.stats,
        healthBack: debouncedState.healthBack,
        healthBan: debouncedState.healthBan,
        refreshBans,
        refreshJails,
        refreshJail,
      }}
    >
      {children}
    </Fail2BanContext.Provider>
  );
};
