import { useContext, useEffect } from 'react';

import { Fail2BanContext } from '@/context/fail2ban';

type JailRefresherProps = { jail: string };

export const JailRefresher: React.FC<JailRefresherProps> = ({ jail }) => {
  const { refreshJail } = useContext(Fail2BanContext);

  useEffect(() => {
    const timer = setInterval(() => {
      refreshJail(jail);
    }, 10000);

    return () => clearInterval(timer);
  }, [jail, refreshJail]);

  return null;
};
