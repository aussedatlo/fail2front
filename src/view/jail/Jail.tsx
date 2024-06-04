import { useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ShieldIcon from '@mui/icons-material/Shield';
import {
  Box,
  Button,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import useResizeObserver from 'use-resize-observer';

import { Grid } from '@/components/Grid';
import { Tile } from '@/components/Tile';
import { Fail2BanContext } from '@/context/fail2ban';
import { BanNowCard } from '@/view/jail/BanNowCard';
import { ConfigCard } from '@/view/jail/ConfigCard';
import { IpBannedCard } from '@/view/jail/IpBannedCard';
import { LastEventsCard } from '@/view/jail/LastEventsCard';
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

type JailParams = {
  jail: string;
};

export const JailView: React.FC = () => {
  const theme = useTheme();
  const { jail } = useParams<keyof JailParams>() as JailParams;
  const { jails, stats } = useContext(Fail2BanContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const chartFailedRef = useResizeObserver();
  const chartBannedRef = useResizeObserver();
  const { ref, width } = useResizeObserver();

  const jailData = jails?.find((j) => j.name === jail);
  const jailStat = useMemo(() => stats?.[jail] ?? {}, [stats, jail]);

  const labels = Object.keys(jailStat);

  const generateData = useCallback(
    (key: 'currently_banned' | 'currently_failed') => {
      return labels.reduce((acc: number[], value: string) => {
        acc.push(jailStat[value][key]);
        return acc;
      }, []);
    },
    [jailStat, labels],
  );

  const dataCurrentlyBanned = useMemo(
    () => generateData('currently_banned'),
    [generateData],
  );
  const dataCurrentlyFailed = useMemo(
    () => generateData('currently_failed'),
    [generateData],
  );

  if (!jailData || !stats) {
    return null;
  }

  return (
    <Root ref={ref}>
      <TitleContainer>
        <ShieldIcon fontSize="large" sx={{ marginRight: 2 }} />
        <Typography variant="h5">{jailData.name}</Typography>

        <Box sx={{ flex: 1 }} />

        {!isEditMode ? (
          <Tooltip title="Edit layout" arrow>
            <Button
              onClick={() => setIsEditMode(true)}
              sx={{ marginRight: 1 }}
              variant="contained"
            >
              <DashboardCustomizeIcon />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Save layout" arrow>
            <Button
              onClick={() => setIsEditMode(false)}
              sx={{ marginRight: 1 }}
              variant="contained"
              color="secondary"
            >
              <SaveIcon />
            </Button>
          </Tooltip>
        )}

        <Tooltip title="Edit Jail" arrow>
          <Button sx={{ marginRight: 1 }} variant="contained">
            <EditIcon />
          </Button>
        </Tooltip>
      </TitleContainer>

      {width && (
        <Grid width={width} type="jail" isEditMode={isEditMode}>
          <Box key="failed-total">
            <Tile isEditMode={isEditMode}>
              <StatCard
                value={jailData.filter.failed}
                title="Total failed"
                color={theme.palette.primary.main}
              />
            </Tile>
          </Box>

          <Box key="failed-current">
            <Tile isEditMode={isEditMode}>
              <StatCard
                value={jailData.filter.currently_failed}
                title="Current failed"
                color={theme.palette.primary.main}
              />
            </Tile>
          </Box>

          <Box key="failed-graph">
            <Box
              ref={chartFailedRef.ref}
              sx={{ display: 'flex', height: '100%', flex: 1 }}
            >
              <Tile isEditMode={isEditMode}>
                <LineChartCard
                  height={chartFailedRef.height ?? 0}
                  data={dataCurrentlyFailed ?? []}
                  labels={labels ?? []}
                  title="Failed over time"
                  color={theme.palette.primary.main}
                />
              </Tile>
            </Box>
          </Box>

          <Box key="banned-total">
            <Tile isEditMode={isEditMode}>
              <StatCard
                value={jailData.stats.banned}
                title="Total banned"
                color={theme.palette.secondary.main}
              />
            </Tile>
          </Box>

          <Box key="banned-current">
            <Tile isEditMode={isEditMode}>
              <StatCard
                value={jailData.stats.currently_banned}
                title="Current banned"
                color={theme.palette.secondary.main}
              />
            </Tile>
          </Box>

          <Box key="banned-graph">
            <Box
              ref={chartBannedRef.ref}
              sx={{ display: 'flex', height: '100%', flex: 1 }}
            >
              <Tile isEditMode={isEditMode}>
                <LineChartCard
                  height={chartBannedRef.height ?? 0}
                  data={dataCurrentlyBanned ?? []}
                  labels={labels ?? []}
                  title="Banned over time"
                  color={theme.palette.secondary.main}
                />
              </Tile>
            </Box>
          </Box>

          <Box key="ip-banned">
            <Tile isEditMode={isEditMode}>
              <IpBannedCard jail={jailData} />
            </Tile>
          </Box>

          <Box key="last-events">
            <Tile isEditMode={isEditMode}>
              <LastEventsCard jail={jailData} />
            </Tile>
          </Box>

          <Box key="ban-now">
            <Tile isEditMode={isEditMode}>
              <BanNowCard jail={jailData} />
            </Tile>
          </Box>

          <Box key="config">
            <Tile isEditMode={isEditMode}>
              <ConfigCard jail={jailData} />
            </Tile>
          </Box>
        </Grid>
      )}
    </Root>
  );
};
