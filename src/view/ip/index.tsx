import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LanIcon from '@mui/icons-material/Lan';
import SaveIcon from '@mui/icons-material/Save';
import ShieldIcon from '@mui/icons-material/Shield';
import {
  Box,
  Breadcrumbs,
  Button,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import useResizeObserver from 'use-resize-observer';

import { BanButton } from '@/components/buttons/BanButton';
import { UnbanButton } from '@/components/buttons/UnbanButton';
import { UpdateIpButton } from '@/components/buttons/UpdateIpButton';
import { LastEventsContentTile } from '@/components/LastEventsContentTile';
import { Grid } from '@/components/layouts/Grid';
import { Tile } from '@/components/layouts/Tile';
import { JailRefresher } from '@/components/refresher/JailRefresher';
import { StatContentTile } from '@/components/StatContentTile';
import { useEventsByIp } from '@/hooks/useEvents';
import { useIpInfos } from '@/hooks/useIp';
import { useBanStatus, useJail } from '@/hooks/useJail';
import { IpInfosContentTile } from '@/view/ip/components/IpInfosContentTile';
import MapContentTile from '@/view/ip/components/MapContentTile';
import { StatusContentTile } from '@/view/ip/components/StatusContentTile';

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

type IpParams = {
  jail: string;
  ip: string;
};

export const IpView: React.FC = () => {
  const { ip, jail: jailName } = useParams<keyof IpParams>() as IpParams;
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const jail = useJail(jailName);
  const isBanned = useBanStatus(jail.name, ip);
  const events = useEventsByIp(jail.name, ip);
  const ipInfos = useIpInfos(ip);
  const { ref, width } = useResizeObserver();

  const numberOfBans = useMemo(
    () => events.filter((event) => event.type === 'Banned').length,
    [events],
  );
  const numberOfFails = useMemo(
    () => events.filter((event) => event.type === 'Failed').length,
    [events],
  );

  const onGoBack = () => {
    navigate(-1);
  };

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
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={onGoBack}
          >
            <ShieldIcon sx={{ marginRight: 1 }} />
            <StyledTypography variant="h5" color="text.primary">
              {jail.name}
            </StyledTypography>
          </Box>
          <Box
            sx={{ fontSize: '1.5em', display: 'flex', alignItems: 'center' }}
          >
            <LanIcon sx={{ marginRight: 1 }} />
            <Typography variant="h5" color="primary">
              {ip}
            </Typography>
          </Box>
        </Breadcrumbs>

        <Box sx={{ flexGrow: 1 }} />

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

        {isBanned ? (
          <UnbanButton ip={ip} jailName={jail.name} />
        ) : (
          <BanButton ip={ip} jailName={jail.name} />
        )}

        <UpdateIpButton ip={ip} />
      </Box>

      {width && (
        <Grid width={width} type="ip" isEditMode={isEditMode}>
          <Box key="status">
            <Tile isEditMode={isEditMode} title="Status">
              <StatusContentTile isBanned={isBanned} isFailed={false} />
            </Tile>
          </Box>

          <Box key="banned-total">
            <Tile isEditMode={isEditMode} title="Total banned">
              <StatContentTile value={numberOfBans} color="secondary" />
            </Tile>
          </Box>

          <Box key="failed-total">
            <Tile isEditMode={isEditMode} title="Total failed">
              <StatContentTile value={numberOfFails} color="primary" />
            </Tile>
          </Box>

          <Box key="last-events">
            <Tile isEditMode={isEditMode} title="Last events">
              <LastEventsContentTile jailName={jail.name} events={events} />
            </Tile>
          </Box>

          <Box key="ip-infos">
            <Tile isEditMode={isEditMode} title="IP infos">
              <IpInfosContentTile ipInfos={ipInfos} />
            </Tile>
          </Box>

          <Box key="map">
            <Tile isEditMode={isEditMode} title="Map">
              <MapContentTile ip={ip} />
            </Tile>
          </Box>
        </Grid>
      )}
    </Root>
  );
};
