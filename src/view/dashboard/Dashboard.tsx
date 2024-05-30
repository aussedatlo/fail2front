import React, { useContext } from 'react';

import { Fail2BanContext } from '@/context/fail2ban';

export const Dashboard: React.FC = () => {
  const { bans } = useContext(Fail2BanContext);

  return (
    <>
      <div>{bans?.length}</div>
    </>
  );
};
