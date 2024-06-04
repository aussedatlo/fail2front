import { useContext, useEffect, useMemo, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { Fail2BanContext } from '@/context/fail2ban';
import { useSize } from '@/provider/SizeProvider';
import { Jail } from '@/types/Jail';

const TextContainer = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  height: 40,
  alignItems: 'center',
  justifyContent: 'start',
});

type JailEvent = {
  date: Date;
  type: 'Banned' | 'Failed';
  ip: string;
};

type LastEventsCardProps = {
  jail: Jail;
};

export const LastEventsCard: React.FC<LastEventsCardProps> = ({ jail }) => {
  const { refreshJail, fails, globalBans } = useContext(Fail2BanContext);
  const [page, setPage] = useState(0);
  const height = useSize().height ?? 0;

  useEffect(() => {
    const timer = setInterval(() => {
      refreshJail(jail);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [jail, refreshJail]);

  const formattedFails: JailEvent[] = useMemo(() => {
    return (
      fails?.[jail.name]?.map((fail) => ({
        date: new Date(fail.timeoffail * 1000),
        type: 'Failed',
        ip: fail.ip,
      })) ?? []
    );
  }, [fails, jail.name]);

  const formattedBans: JailEvent[] = useMemo(() => {
    return (
      globalBans?.[jail.name]?.map((ban) => ({
        date: new Date(ban.timeofban * 1000),
        type: 'Banned',
        ip: ban.ip,
      })) ?? []
    );
  }, [globalBans, jail.name]);

  const formattedEvents = [...formattedFails, ...formattedBans].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // height - 150 because of the pagination / 50 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  const formattedEventsPage = useMemo(
    () => formattedEvents.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [formattedEvents, page, rowsPerPage],
  );

  const onPageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => {
    setPage(page);
  };

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Last events
      </Typography>

      <TableContainer component={Box} sx={{ marginTop: 2 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Ip Address</TableCell>
              <TableCell>Event</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {formattedEventsPage.map((event, index) => (
              <TableRow key={index}>
                <TableCell padding="none">
                  <TextContainer>
                    <ReactTimeAgo
                      date={event.date}
                      locale="en-US"
                      timeStyle="round"
                    />
                  </TextContainer>
                </TableCell>
                <TableCell padding="none">
                  <TextContainer>{event.ip}</TextContainer>
                </TableCell>
                <TableCell padding="none">
                  <TextContainer>
                    {event.type === 'Failed' ? (
                      <WarningIcon
                        color="primary"
                        sx={{ marginRight: 1, fontSize: '1.2em' }}
                      />
                    ) : (
                      <BlockIcon
                        color="secondary"
                        sx={{ marginRight: 1, fontSize: '1.2em' }}
                      />
                    )}
                    {event.type}
                  </TextContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component={Box}
        count={formattedEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
      />
    </>
  );
};
