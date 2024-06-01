import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShieldIcon from '@mui/icons-material/Shield';
import { Box, Button, Grid, styled, Typography, useTheme } from '@mui/material';

import { Fail2BanContext } from '@/context/fail2ban';
import { JailEvent, LastEventsCard } from '@/view/jail/LastEventsCard';
import { LineChartCard } from '@/view/jail/LineChartCard';
import { StatCard } from '@/view/jail/StatCard';

const Root = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(3)};
  flex: 1;
`;
const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

export const JailView: React.FC = () => {
  const { jail } = useParams();
  const { jails } = useContext(Fail2BanContext);
  const theme = useTheme();

  const jailData = jails?.find((j) => j.name === jail);

  const data1 = [20, 12, 14, 18, 26, 20, 22];
  const data2 = [...data1].reverse();

  const labels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];

  const events: JailEvent[] = [
    { date: '2024-06-01 09:53:28', type: 'Failed', ip: '135.148.100.196' },
    { date: '2024-06-01 09:58:43', type: 'Banned', ip: '135.148.100.196' },
    { date: '2024-06-01 10:03:58', type: 'Failed', ip: '3.249.164.188' },
    { date: '2024-06-01 10:03:58', type: 'Failed', ip: '34.245.164.232' },
    { date: '2024-06-01 10:09:13', type: 'Failed', ip: '18.201.84.193' },
    { date: '2024-06-01 10:14:28', type: 'Failed', ip: '18.201.84.193' },
    { date: '2024-06-01 10:14:28', type: 'Banned', ip: '18.201.84.193' },
  ];

  if (!jailData) {
    return null;
  }

  return (
    <Root>
      <TitleContainer>
        <ShieldIcon fontSize="large" sx={{ marginRight: 2 }} />
        <Typography variant="h5">{jailData.name}</Typography>

        <Box sx={{ flex: 1 }} />

        <Button
          startIcon={<DeleteOutlineIcon />}
          variant="contained"
          color="secondary"
        >
          Disable
        </Button>
      </TitleContainer>

      <Grid container sx={{ flexGrow: 1 }} spacing={3}>
        <Grid item xs={6}>
          <Grid container sx={{ flexGrow: 1 }} spacing={3}>
            <Grid item xs={3}>
              <StatCard
                value={jailData.filter.failed}
                title="Failed"
                color={theme.palette.primary.main}
              />
            </Grid>

            <Grid item xs={9}>
              <LineChartCard
                data={data2}
                labels={labels}
                title="Failed over time"
                color={theme.palette.primary.main}
              />
            </Grid>

            <Grid item xs={3}>
              <StatCard
                value={jailData.filter.currently_failed}
                title="Banned"
                color={theme.palette.secondary.main}
              />
            </Grid>

            <Grid item xs={9}>
              <LineChartCard
                data={data1}
                labels={labels}
                title="Banned over time"
                color={theme.palette.secondary.main}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <LastEventsCard events={events} />
        </Grid>
      </Grid>
    </Root>
  );
};
