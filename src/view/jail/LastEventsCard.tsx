import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
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

export type JailEvent = {
  date: string;
  type: 'Banned' | 'Failed';
  ip: string;
};

type LastEventsCardProps = {
  events: JailEvent[];
};

export const LastEventsCard: React.FC<LastEventsCardProps> = ({ events }) => {
  return (
    <Card sx={{ display: 'flex', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
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
                          sx={{ marginRight: 2 }}
                          fontSize="small"
                        />
                      ) : (
                        <BlockIcon
                          color="secondary"
                          sx={{ marginRight: 2 }}
                          fontSize="small"
                        />
                      )}
                      {event.type}
                    </Box>
                  </TableCell>
                  <TableCell>{event.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 3,
          }}
        >
          <Pagination count={10} size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};
