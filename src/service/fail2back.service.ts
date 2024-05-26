import axios from 'axios';

import { Ban } from '@/types/Ban';
import { Jail } from '@/types/Jail';

const getBans = async (): Promise<Ban[]> => {
  const response = await axios.request<Ban[]>({
    url: `/api/bans`,
    method: 'GET',
  });

  return response.data;
};

const getJails = async (): Promise<Jail[]> => {
  const response = await axios.request({
    url: `/api/jails`,
    method: 'GET',
  });

  return response.data;
};

export default { getBans, getJails };
