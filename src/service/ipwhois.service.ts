import axios from 'axios';

import { IpInfos } from '@/types/IpInfos';

const cache: Record<string, IpInfos> = {};

const getIpAddress = async (ip: string) => {
  if (cache[ip]) {
    return cache[ip];
  }

  const response = await axios.request<IpInfos>({
    url: `https://ipwho.is/` + ip,
    method: 'GET',
  });

  console.log(response);

  cache[ip] = response.data;
  return response.data;
};

export default {
  getIpAddress,
};
