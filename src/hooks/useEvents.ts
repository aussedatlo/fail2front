import { useMemo } from 'react';

import { useJailFails, useJailGlobalBans } from '@/hooks/useJail';
import { Event } from '@/types/Event';

export const useEvents = (jailName: string) => {
  const fails = useJailFails(jailName);
  const globalBans = useJailGlobalBans(jailName);

  const failsEvents: Event[] = useMemo(() => {
    return fails.map((fail) => ({
      date: fail.timeoffail * 1000,
      type: 'Failed',
      ip: fail.ip,
      match: fail.match,
    }));
  }, [fails]);

  const bansEvents: Event[] = useMemo(() => {
    return globalBans.map((ban) => ({
      date: ban.timeofban * 1000,
      type: 'Banned',
      ip: ban.ip,
      match: ban.data.matches.at(-1) ?? 'Manual ban',
    }));
  }, [globalBans]);

  return useMemo(
    () =>
      [...failsEvents, ...bansEvents].sort((a, b) => {
        if (a.date !== b.date) {
          return b.date - a.date;
        } else {
          if (a.type === 'Failed' && b.type === 'Banned') {
            return 1;
          } else if (a.type === 'Banned' && b.type === 'Failed') {
            return -1;
          } else {
            return 0;
          }
        }
      }),
    [failsEvents, bansEvents],
  );
};

export const useEventsByIp = (jailName: string, ip: string) => {
  const events = useEvents(jailName);
  return useMemo(() => events.filter((event) => event.ip === ip), [events, ip]);
};
