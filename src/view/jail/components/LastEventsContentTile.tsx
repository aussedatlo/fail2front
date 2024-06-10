import { useContext, useEffect, useMemo } from 'react';
import ReactTimeAgo from 'react-time-ago';
import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';

import { Table } from '@/components/layouts/Table';
import { Fail2BanContext } from '@/context/fail2ban';
import { useSize } from '@/provider/SizeProvider';
import { Jail } from '@/types/Jail';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '100em',
  },
});

type JailEvent = {
  date: number;
  type: 'Banned' | 'Failed';
  ip: string;
  match: string;
};

type LastEventsContentTileProps = {
  jail: Jail;
};

export const LastEventsContentTile: React.FC<LastEventsContentTileProps> = ({
  jail,
}) => {
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
        date: fail.timeoffail * 1000,
        type: 'Failed',
        ip: fail.ip,
        match: fail.match,
      })) ?? []
    );
  }, [fails, jail.name]);

  const formattedBans: JailEvent[] = useMemo(() => {
    return (
      globalBans?.[jail.name]?.map((ban) => ({
        date: ban.timeofban * 1000,
        type: 'Banned',
        ip: ban.ip,
        match: ban.data.matches.at(-1) ?? 'Manual ban',
      })) ?? []
    );
  }, [globalBans, jail.name]);

  const formattedEvents: JailEvent[] = [
    ...formattedFails,
    ...formattedBans,
  ].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date - a.date;
    } else {
      if (a.type === 'Failed' && b.type === 'Banned') {
        return 1;
      } else if (a.type === 'Banned' && b.type === 'Failed') {
        return -1;
      } else {
        return 0;
      }
    }
  });

  console.log(formattedEvents);

  // height - 150 because of the pagination / 50 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  const formatter = (row: JailEvent) => {
    const { date, type, ip, match } = row;

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
      match: (
        <CustomWidthTooltip title={match} arrow placement="bottom-start">
          <Typography noWrap variant="body2">
            {match}
          </Typography>
        </CustomWidthTooltip>
      ),
    };
  };

  return (
    <Table
      labels={['Date', 'Type', 'IP', 'Match']}
      rowsPerPage={rowsPerPage}
      colsWidth={['150px', '130px', '150px']}
      data={formattedEvents}
      formatter={formatter}
    />
  );
};
