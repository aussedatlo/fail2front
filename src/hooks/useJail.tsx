import { useContext } from 'react';

import { EMPTY_JAIL } from '@/constants/empty/emptyJail';
import { Fail2BanContext } from '@/context/fail2ban';

export const useJail = (jailName: string) => {
  const { jails } = useContext(Fail2BanContext);
  return jails.find((jail) => jail.name === jailName) ?? EMPTY_JAIL;
};

export const useJailStats = (jailName: string) => {
  const { stats } = useContext(Fail2BanContext);
  return stats[jailName] ?? {};
};

export const useJailFails = (jailName: string) => {
  const { fails } = useContext(Fail2BanContext);
  return fails[jailName] ?? [];
};

export const useJailGlobalBans = (jailName: string) => {
  const { globalBans } = useContext(Fail2BanContext);
  return globalBans[jailName] ?? [];
};

export const useBanStatus = (jailName: string, ip: string) => {
  const jail = useJail(jailName);

  return jail.stats.ip_list.findIndex((jailIp) => jailIp.ip === ip) !== -1;
};
