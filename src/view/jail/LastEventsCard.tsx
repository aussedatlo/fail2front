import { useContext, useMemo, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Button,
  Card,
  CardContent,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { Fail2BanContext } from '@/context/fail2ban';
import fail2backService from '@/service/fail2back.service';
import { Jail } from '@/types/Jail';

type JailEvent = {
  date: Date;
  type: 'Banned' | 'Failed';
  ip: string;
};

type LastEventsCardProps = {
  jail: Jail;
};

export const LastEventsCard: React.FC<LastEventsCardProps> = ({ jail }) => {
  const { refreshJails, fails, globalBans } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);

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

  const rowsPerPage = 6;
  const pageSize = Math.ceil(formattedEvents.length / rowsPerPage);

  const formattedEventsPage = useMemo(
    () => formattedEvents.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [formattedEvents, page],
  );

  const onBan = async (ip: string) => {
    const response = await fail2backService.postJailsBan(jail.name, ip);
    if (response) {
      enqueueSnackbar(`Ip ${ip} banned`, { variant: 'success' });
      refreshJails();
    } else {
      enqueueSnackbar(`Unable to ban Ip ${ip}`, { variant: 'error' });
    }
  };

  const onUnban = async (ip: string) => {
    const response = await fail2backService.postJailsUnban(jail.name, ip);
    if (response) {
      enqueueSnackbar(`Ip ${ip} Unbanned`, { variant: 'success' });
      refreshJails();
    } else {
      enqueueSnackbar(`Unable to ban Ip ${ip}`, { variant: 'error' });
    }
  };

  const onPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Card>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '30em' }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Last events
        </Typography>

        <TableContainer component={Box} sx={{ marginTop: 2 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell sx={{ width: '15em' }}>Event</TableCell>
                <TableCell sx={{ width: '15em' }}>Ip Address</TableCell>
                <TableCell align="right" sx={{ width: '8em' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {formattedEventsPage.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <ReactTimeAgo
                      date={event.date}
                      locale="en-US"
                      timeStyle="round"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {event.type === 'Failed' ? (
                        <WarningIcon
                          color="primary"
                          sx={{ marginRight: 2, fontSize: '1.5em' }}
                        />
                      ) : (
                        <BlockIcon
                          color="secondary"
                          sx={{ marginRight: 2, fontSize: '1.5em' }}
                        />
                      )}
                      {event.type}
                    </Box>
                  </TableCell>
                  <TableCell>{event.ip}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}
                    >
                      {!jail.stats.ip_list.find(
                        (elem) => elem.ip === event.ip,
                      ) && (
                        <Button
                          color="secondary"
                          variant="outlined"
                          sx={{ width: '6em' }}
                          onClick={() => onBan(event.ip)}
                        >
                          Ban
                        </Button>
                      )}
                      {jail.stats.ip_list.find(
                        (elem) => elem.ip === event.ip,
                      ) && (
                        <Button
                          color="primary"
                          variant="outlined"
                          sx={{ width: '6em' }}
                          onClick={() => onUnban(event.ip)}
                        >
                          unban
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'end',
            marginTop: 2,
          }}
        >
          <Pagination count={pageSize} size="small" onChange={onPageChange} />
        </Box>
      </CardContent>
    </Card>
  );
};
