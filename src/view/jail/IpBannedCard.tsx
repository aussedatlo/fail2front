import { useContext, useEffect, useMemo } from 'react';
import { Typography } from '@mui/material';

import { Table } from '@/components/Table';
import { IpContext } from '@/context/ip';
import { useSize } from '@/provider/SizeProvider';
import { Jail } from '@/types/Jail';

type IpBannedCardProps = {
  jail: Jail;
};

export const IpBannedCard: React.FC<IpBannedCardProps> = ({ jail }) => {
  const { ipInfos, addIp, isLoaded } = useContext(IpContext);
  const height = useSize().height ?? 0;

  // height - 180 because of the pagination / 40 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  useEffect(() => {
    if (!isLoaded) return;

    jail.stats.ip_list.forEach(({ ip }) => {
      if (!ipInfos[ip]) {
        addIp(ip);
      }
    });
  }, [addIp, ipInfos, isLoaded, jail]);

  const data = useMemo(() => {
    return jail.stats.ip_list.map(({ ip }) => {
      const ipInfo = ipInfos[ip];

      return {
        ip,
        country: (
          <>
            <span style={{ marginRight: 8 }}>{ipInfo?.flag?.emoji}</span>
            {ipInfo?.country ?? 'Unknown'}
          </>
        ),
        city: ipInfo?.city ?? 'Unknown',
        provider: ipInfo?.connection?.isp ?? 'Unknown',
      };
    });
  }, [ipInfos, jail]);

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Banned Ips
      </Typography>

      <Table
        labels={['Ip', 'Country', 'City', 'Provider']}
        rowsPerPage={rowsPerPage}
        colsWidth={['20%', '20%', '20%', '40%']}
        data={data}
      />
    </>
  );
};
