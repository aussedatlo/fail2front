import React from 'react';

import { useBans } from '@/hooks/useBans';

export const Dashboard: React.FC = () => {
  const bans = useBans();

  return <div>bans: {bans?.length}</div>;
};
