import { createContext, useCallback, useEffect, useState } from 'react';

import IpService from '@/service/ipwhois.service';
import { IpInfos } from '@/types/IpInfos';

type IpContextProps = {
  isLoaded: boolean;
  ipInfos: Record<string, IpInfos>;
  addIp: (ip: string, useCache?: boolean) => void;
};

const initialIpContext: IpContextProps = {
  isLoaded: false,
  ipInfos: {},
  addIp: () => {},
};

export const IpContext = createContext<IpContextProps>(initialIpContext);

type IpContextProviderProps = {
  children: React.ReactElement;
};

export const IpContextProvider: React.FC<IpContextProviderProps> = ({
  children,
}: IpContextProviderProps) => {
  const [ipInfos, setIpInfos] = useState<Record<string, IpInfos>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const addIp = useCallback(async (ip: string, useCache: boolean = true) => {
    const response = await IpService.getIpInfos(ip, useCache);
    setIpInfos((prev) => ({ ...prev, [ip]: response }));
  }, []);

  const updateStorage = useCallback(() => {
    localStorage.setItem('ipInfos', JSON.stringify(ipInfos));
  }, [ipInfos]);

  const initHostIp = useCallback(async () => {
    const hostIpInfos = await IpService.getIpInfos('host', false);
    console.log('hostIpInfos', hostIpInfos);
    setIpInfos((prev) => ({ ...prev, host: hostIpInfos }));
  }, []);

  const initStorage = useCallback(() => {
    const ipInfos = localStorage.getItem('ipInfos');
    if (ipInfos) {
      setIpInfos(JSON.parse(ipInfos));
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    updateStorage();
  }, [ipInfos, isLoaded, updateStorage]);

  useEffect(() => {
    initStorage();
    initHostIp().then(() => setIsLoaded(true));
  }, [initHostIp, initStorage]);

  return (
    <IpContext.Provider
      value={{
        isLoaded,
        ipInfos,
        addIp,
      }}
    >
      {children}
    </IpContext.Provider>
  );
};
