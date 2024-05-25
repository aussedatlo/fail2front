import axios from 'axios';

import { Ban } from '@/types/Ban';

export const Fail2BackService = () => {
  const _host = 'localhost';
  const _port = '5173';
  const _url = `http://${_host}:${_port}`;

  const getBans = async (): Promise<Ban[] | undefined> => {
    const response = await axios.request<Ban[]>({
      url: `${_url}/bans`,
      method: 'GET',
    });

    console.log(response.data);

    return response.data;
  };

  return { getBans };
};
