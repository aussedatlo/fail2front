import { useContext, useEffect } from 'react';
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
import { IpContext } from '@/context/ip';
import fail2backService from '@/service/fail2back.service';
import { Jail } from '@/types/Jail';

type IpBannedCardProps = {
  jail: Jail;
};

export const IpBannedCard: React.FC<IpBannedCardProps> = ({ jail }) => {
  const { ipInfos, addIp, isLoaded } = useContext(IpContext);
  const { enqueueSnackbar } = useSnackbar();
  const { refreshJails } = useContext(Fail2BanContext);

  useEffect(() => {
    if (!isLoaded) return;

    jail.stats.ip_list.forEach(({ ip }) => {
      if (!ipInfos[ip]) {
        addIp(ip);
      }
    });
  }, [addIp, ipInfos, isLoaded, jail]);

  const onUnban = async (ip: string) => {
    const response = await fail2backService.postJailsUnban(jail.name, ip);
    if (response) {
      enqueueSnackbar(`Ip ${ip} Unbanned`, { variant: 'success' });
      refreshJails();
    } else {
      enqueueSnackbar(`Unable to unban Ip ${ip}`, { variant: 'error' });
    }
  };

  return (
    <Card>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', maxHeight: '32em' }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Banned Ips
        </Typography>

        <TableContainer component={Box} sx={{ marginTop: 2 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Ip Address</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {jail.stats.ip_list.map(({ ip }) => (
                <TableRow key={ip}>
                  <TableCell>{ip}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ marginRight: 1 }}>
                        {ipInfos[ip]?.flag?.emoji}
                      </Box>
                      {ipInfos[ip]?.country}
                    </Box>
                  </TableCell>
                  <TableCell>{ipInfos[ip]?.city}</TableCell>
                  <TableCell>{ipInfos[ip]?.connection?.isp}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{ width: '6em' }}
                      onClick={() => onUnban(ip)}
                    >
                      unban
                    </Button>
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
