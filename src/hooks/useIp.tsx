import { useContext, useEffect, useMemo } from 'react';

import { EMPTY_IP_INFOS } from '@/constants/empty/emptyIpInfos';
import { IpContext } from '@/context/ip';
import { IpInfos } from '@/types/IpInfos';

export const useIpInfos = (ip: string) => {
  const { ipInfos, registerIp, isLoaded } = useContext(IpContext);

  useEffect(() => {
    if (!isLoaded) return;

    if (!ipInfos[ip]) registerIp(ip);
  }, [registerIp, ip, ipInfos, isLoaded]);

  return ipInfos[ip] ?? EMPTY_IP_INFOS;
};

export const useMultipleIpsInfos = (ips: string[]): IpInfos[] => {
  const { ipInfos, registerIp, isLoaded } = useContext(IpContext);

  useEffect(() => {
    if (!isLoaded) return;

    ips.forEach((ip) => {
      if (!ipInfos[ip]) registerIp(ip);
    });
  }, [registerIp, ips, ipInfos, isLoaded]);

  return useMemo(() => {
    return ips.map((ip) => ipInfos[ip] ?? EMPTY_IP_INFOS);
  }, [ipInfos, ips]);
};
