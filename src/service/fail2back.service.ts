import axios from 'axios';

import { Ban } from '@/types/Ban';

const getBans = async (): Promise<Ban[]> => {
  const response = await axios.request<Ban[]>({
    url: `/api/bans`,
    method: 'GET',
  });

  return response.data;
};

export default { getBans };
