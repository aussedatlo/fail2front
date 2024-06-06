import { useCallback, useContext, useMemo, useState } from 'react';
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

import { Grid } from '@/components/layouts/Grid';
import { Tile } from '@/components/layouts/Tile';
import { Fail2BanContext } from '@/context/fail2ban';
import { BannedIpsContentTile } from '@/view/jail/components/BannedIpsContentTile';
import { BanNowContentTile } from '@/view/jail/components/BanNowContentTile';
import { ConfigContentTile } from '@/view/jail/components/ConfigContentTile';
import { LastEventsContentTile } from '@/view/jail/components/LastEventsContentTile';
import { LineChartContentTile } from '@/view/jail/components/LineChartContentTile';
import { StatContentTile } from '@/view/jail/components/StatContentTile';

const Root = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(3)};
  flex: 1;
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
  const { jail } = useParams<keyof JailParams>() as JailParams;
  const { jails, stats } = useContext(Fail2BanContext);
  const [isEditMode, setIsEditMode] = useState(false);

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
              {jail}
            </StyledTypography>
          </Box>
        </Breadcrumbs>

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
      </Box>

      {width && (
        <Grid width={width} type="jail" isEditMode={isEditMode}>
          <Box key="failed-total">
            <Tile isEditMode={isEditMode} title="Total failed">
              <StatContentTile
                value={jailData.filter.failed}
                color={theme.palette.primary.main}
              />
            </Tile>
          </Box>

          <Box key="failed-current">
            <Tile isEditMode={isEditMode} title="Current failed">
              <StatContentTile
                value={jailData.filter.currently_failed}
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
                value={jailData.stats.banned}
                color={theme.palette.secondary.main}
              />
            </Tile>
          </Box>

          <Box key="banned-current">
            <Tile isEditMode={isEditMode} title="Current banned">
              <StatContentTile
                value={jailData.stats.currently_banned}
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
              <BannedIpsContentTile jail={jailData} />
            </Tile>
          </Box>

          <Box key="last-events">
            <Tile isEditMode={isEditMode} title="Last events">
              <LastEventsContentTile jail={jailData} />
            </Tile>
          </Box>

          <Box key="ban-now">
            <Tile isEditMode={isEditMode} title="Ban Ip">
              <BanNowContentTile jail={jailData} />
            </Tile>
          </Box>

          <Box key="config">
            <Tile isEditMode={isEditMode} title="Config file list">
              <ConfigContentTile jail={jailData} />
            </Tile>
          </Box>
        </Grid>
      )}
    </Root>
  );
};
