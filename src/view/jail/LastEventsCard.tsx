import { useContext } from 'react';
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

export type JailEvent = {
  date: string;
  type: 'Banned' | 'Failed';
  ip: string;
};

type LastEventsCardProps = {
  events: JailEvent[];
  jail: Jail;
};

export const LastEventsCard: React.FC<LastEventsCardProps> = ({
  events,
  jail,
}) => {
  const { refreshJails } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <Card>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', maxHeight: '32em' }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Last events
        </Typography>

        <TableContainer component={Box} sx={{ marginTop: 2 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Ip Address</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.date}</TableCell>
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
          <Pagination count={10} size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};
