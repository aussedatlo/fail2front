import { useCallback, useEffect, useState } from 'react';

import Fail2BackService from '@/service/fail2back.service';
import { Ban } from '@/types/Ban';

export const useBans = () => {
  const [bans, setBans] = useState<Ban[]>();

  const refreshBans = useCallback(async () => {
    const bans = await Fail2BackService.getBans();
    setBans(bans);
  }, []);

  useEffect(() => {
    console.log('useEffect');
    refreshBans();
  }, [refreshBans]);

  return bans;
};
