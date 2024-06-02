import axios from 'axios';

import { Ban } from '@/types/Ban';
import { Jail } from '@/types/Jail';

/* health */

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

/* bans */

const getBans = async (): Promise<Ban[]> => {
  const response = await axios.request<Ban[]>({
    url: `/api/bans`,
    method: 'GET',
  });

  return response.data;
};

/* jails */

const getJails = async (): Promise<Jail[]> => {
  const response = await axios.request<Jail[]>({
    url: `/api/jails`,
    method: 'GET',
  });

  return response.data;
};

const postJailsBan = async (jail: string, ip: string): Promise<boolean> => {
  const response = await axios.request<boolean>({
    url: `/api/jails/${jail}/ban`,
    method: 'POST',
    params: { ip },
  });

  return response.data;
};

const postJailsUnban = async (jail: string, ip: string): Promise<boolean> => {
  const response = await axios.request<boolean>({
    url: `/api/jails/${jail}/unban`,
    method: 'POST',
    params: { ip },
  });

  return response.data;
};

export default {
  getHealthBack,
  getHealthBan,
  getBans,
  getJails,
  postJailsBan,
  postJailsUnban,
};
