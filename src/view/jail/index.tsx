import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ShieldIcon from '@mui/icons-material/Shield';
import {
  Box,
  Breadcrumbs,
  Button,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import useResizeObserver from 'use-resize-observer';

import { LastEventsContentTile } from '@/components/LastEventsContentTile';
import { Grid } from '@/components/layouts/Grid';
import { Tile } from '@/components/layouts/Tile';
import { JailRefresher } from '@/components/refresher/JailRefresher';
import { StatContentTile } from '@/components/StatContentTile';
import { useEvents } from '@/hooks/useEvents';
import { useMultipleIpsInfos } from '@/hooks/useIp';
import { useJail, useJailStats } from '@/hooks/useJail';
import { BannedIpsContentTile } from '@/view/jail/components/BannedIpsContentTile';
import { BanNowContentTile } from '@/view/jail/components/BanNowContentTile';
import { ConfigContentTile } from '@/view/jail/components/ConfigContentTile';
import { LineChartContentTile } from '@/view/jail/components/LineChartContentTile';

const Root = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(3)};
  flex: 1;
  overflow-y: auto;
  padding-bottom: 1rem;
`;

const StyledTypography = styled(Typography)`
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

type JailParams = {
  jail: string;
};

export const JailView: React.FC = () => {
  const theme = useTheme();
  const { jail: jailName } = useParams<keyof JailParams>() as JailParams;
  const [isEditMode, setIsEditMode] = useState(false);
  const { ref, width } = useResizeObserver();
  const jail = useJail(jailName);
  const stats = useJailStats(jailName);
  const ips = useMultipleIpsInfos(jail.stats.ip_list.map(({ ip }) => ip));
  const events = useEvents(jail.name);

  const labels = Object.keys(stats);

  const generateData = useCallback(
    (key: 'currently_banned' | 'currently_failed') => {
      return labels.reduce((acc: number[], value: string) => {
        acc.push(stats[value][key]);
        return acc;
      }, []);
    },
    [stats, labels],
  );

  const dataCurrentlyBanned = useMemo(
    () => generateData('currently_banned'),
    [generateData],
  );
  const dataCurrentlyFailed = useMemo(
    () => generateData('currently_failed'),
    [generateData],
  );

  return (
    <Root ref={ref}>
      <JailRefresher jail={jail.name} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          marginBottom: 5,
          marginTop: 1,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShieldIcon sx={{ marginRight: 1 }} />
            <StyledTypography variant="h5" color="text.primary">
              {jail.name}
            </StyledTypography>
          </Box>
        </Breadcrumbs>

        <Box sx={{ flex: 1 }} />

        {!isEditMode ? (
          <Tooltip title="Edit layout" arrow>
            <Button
              onClick={() => setIsEditMode(true)}
              sx={{ margin: 0.5 }}
              variant="contained"
            >
              <DashboardCustomizeIcon />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Save layout" arrow>
            <Button
              onClick={() => setIsEditMode(false)}
              sx={{ margin: 0.5 }}
              variant="contained"
              color="secondary"
            >
              <SaveIcon />
            </Button>
          </Tooltip>
        )}

        <Tooltip title="Edit Jail" arrow>
          <Button sx={{ margin: 0.5 }} variant="contained">
            <EditIcon />
          </Button>
        </Tooltip>
      </Box>

      {width && (
        <Grid width={width} type="jail" isEditMode={isEditMode}>
          <Box key="failed-total">
            <Tile isEditMode={isEditMode} title="Total failed">
              <StatContentTile
                value={jail.filter.failed}
                color={theme.palette.primary.main}
              />
            </Tile>
          </Box>

          <Box key="failed-current">
            <Tile isEditMode={isEditMode} title="Current failed">
              <StatContentTile
                value={jail.filter.currently_failed}
                color={theme.palette.primary.main}
              />
            </Tile>
          </Box>

          <Box key="failed-graph">
            <Tile isEditMode={isEditMode} title="Failed over time">
              <LineChartContentTile
                data={dataCurrentlyFailed ?? []}
                labels={labels ?? []}
                color={theme.palette.primary.main}
              />
            </Tile>
          </Box>

          <Box key="banned-total">
            <Tile isEditMode={isEditMode} title="Total banned">
              <StatContentTile
                value={jail.stats.banned}
                color={theme.palette.secondary.main}
              />
            </Tile>
          </Box>

          <Box key="banned-current">
            <Tile isEditMode={isEditMode} title="Current banned">
              <StatContentTile
                value={jail.stats.currently_banned}
                color={theme.palette.secondary.main}
              />
            </Tile>
          </Box>

          <Box key="banned-graph">
            <Tile isEditMode={isEditMode} title="Banned over time">
              <LineChartContentTile
                data={dataCurrentlyBanned ?? []}
                labels={labels ?? []}
                color={theme.palette.secondary.main}
              />
            </Tile>
          </Box>

          <Box key="ip-banned">
            <Tile isEditMode={isEditMode} title="Banned Ips">
              <BannedIpsContentTile jailName={jail.name} ips={ips} />
            </Tile>
          </Box>

          <Box key="last-events">
            <Tile isEditMode={isEditMode} title="Last events">
              <LastEventsContentTile jailName={jail.name} events={events} />
            </Tile>
          </Box>

          <Box key="ban-now">
            <Tile isEditMode={isEditMode} title="Ban Ip">
              <BanNowContentTile jailName={jail.name} />
            </Tile>
          </Box>

          <Box key="config">
            <Tile isEditMode={isEditMode} title="Config file list">
              <ConfigContentTile jail={jail} />
            </Tile>
          </Box>
        </Grid>
      )}
    </Root>
  );
};
