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

const getHealthBack = async (): Promise<boolean> => {
  const response = await axios.request({
    url: `/api/health/back`,
    method: 'GET',
  });

  return response.data ? true : false;
};

const getHealthBan = async (): Promise<boolean> => {
  const response = await axios.request({
    url: `/api/health/ban`,
    method: 'GET',
  });

  return response.data ? true : false;
};

export default { getBans, getJails, getHealthBack, getHealthBan };
