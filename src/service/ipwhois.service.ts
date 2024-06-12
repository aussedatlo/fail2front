import axios from 'axios';

import { IpInfos } from '@/types/IpInfos';

const cache: Record<string, IpInfos> = {};

const getIpInfos = async (ip: string, useCache: boolean = true) => {
  if (useCache && cache[ip]) {
    return cache[ip];
  }

  const response = await axios.request<IpInfos>({
    url: `https://ipwho.is/${ip === 'host' ? '' : ip}`,
    method: 'GET',
  });

  cache[ip] = response.data;
  return response.data;
};

export default {
  getIpInfos,
};
