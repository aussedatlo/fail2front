import { useContext, useEffect, useMemo } from 'react';
import ReactTimeAgo from 'react-time-ago';
import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Typography } from '@mui/material';

import { Table } from '@/components/Table';
import { Fail2BanContext } from '@/context/fail2ban';
import { useSize } from '@/provider/SizeProvider';
import { Jail } from '@/types/Jail';

type JailEvent = {
  date: string;
  type: 'Banned' | 'Failed';
  ip: string;
};

type LastEventsCardProps = {
  jail: Jail;
};

export const LastEventsCard: React.FC<LastEventsCardProps> = ({ jail }) => {
  const { refreshJail, fails, globalBans } = useContext(Fail2BanContext);
  const height = useSize().height ?? 0;

  useEffect(() => {
    const timer = setInterval(() => {
      refreshJail(jail.name);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [jail, refreshJail]);

  const formattedFails: JailEvent[] = useMemo(() => {
    return (
      fails?.[jail.name]?.map((fail) => ({
        date: fail.timeoffail * 1000 + '',
        type: 'Failed',
        ip: fail.ip,
      })) ?? []
    );
  }, [fails, jail.name]);

  const formattedBans: JailEvent[] = useMemo(() => {
    return (
      globalBans?.[jail.name]?.map((ban) => ({
        date: ban.timeofban * 1000 + '',
        type: 'Banned',
        ip: ban.ip,
      })) ?? []
    );
  }, [globalBans, jail.name]);

  const formattedEvents: JailEvent[] = [
    ...formattedFails,
    ...formattedBans,
  ].sort((a, b) => Number(b.date) - Number(a.date));

  // height - 150 because of the pagination / 50 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  const formatter = (row: JailEvent) => {
    const { date, type, ip } = row;

    return {
      date: <ReactTimeAgo date={Number(date)} />,
      type:
        type === 'Banned' ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BlockIcon
              color="secondary"
              sx={{ width: '0.8em', marginRight: 1 }}
            />{' '}
            Banned
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon
              color="primary"
              sx={{ width: '0.8em', marginRight: 1 }}
            />{' '}
            Failed
          </Box>
        ),
      ip,
    };
  };

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Last events
      </Typography>

      <Table
        labels={['Date', 'Type', 'IP']}
        rowsPerPage={rowsPerPage}
        colsWidth={['30%', '30%', '30%']}
        data={formattedEvents}
        formatter={formatter}
      />
    </>
  );
};
