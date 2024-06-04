import { useContext, useEffect, useMemo, useState } from 'react';
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

import { IpContext } from '@/context/ip';
import { useSize } from '@/provider/SizeProvider';
import { Jail } from '@/types/Jail';

const TextContainer = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 0,
  whiteSpace: 'nowrap',
  height: 40,
  alignItems: 'center',
  justifyContent: 'start',
});

type IpBannedCardProps = {
  jail: Jail;
};

export const IpBannedCard: React.FC<IpBannedCardProps> = ({ jail }) => {
  const { ipInfos, addIp, isLoaded } = useContext(IpContext);
  const [page, setPage] = useState(0);
  const height = useSize().height ?? 0;

  // height - 180 because of the pagination / 40 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  const formattedEventsPage = useMemo(
    () =>
      jail.stats.ip_list.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [jail.stats.ip_list, page, rowsPerPage],
  );

  useEffect(() => {
    if (!isLoaded) return;

    jail.stats.ip_list.forEach(({ ip }) => {
      if (!ipInfos[ip]) {
        addIp(ip);
      }
    });
  }, [addIp, ipInfos, isLoaded, jail]);

  const onPageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => {
    setPage(page);
  };

  return (
    <>
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
            </TableRow>
          </TableHead>

          <TableBody>
            {formattedEventsPage.map(({ ip }) => (
              <TableRow key={ip} sx={{ height: 30, fontSize: '0.5em' }}>
                <TableCell padding={'none'}>
                  <TextContainer width={'10em'}>{ip}</TextContainer>
                </TableCell>
                <TableCell padding={'none'}>
                  <TextContainer width={'15em'}>
                    <span style={{ marginRight: '0.5em' }}>
                      {ipInfos[ip]?.flag?.emoji}
                    </span>
                    {ipInfos[ip]?.country}
                  </TextContainer>
                </TableCell>
                <TableCell padding={'none'}>
                  <TextContainer width={'15em'}>
                    {ipInfos[ip]?.city}
                  </TextContainer>
                </TableCell>
                <TableCell padding={'none'}>
                  <TextContainer>{ipInfos[ip]?.connection?.isp}</TextContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component={Box}
        count={jail.stats.ip_list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
      />
    </>
  );
};
