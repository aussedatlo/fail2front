import { useContext, useState } from 'react';
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

import { BanUnbanButton } from '@/components/buttons/BanUnbanButton';
import { UpdateIpButton } from '@/components/buttons/UpdateIpButton';
import { Grid } from '@/components/layouts/Grid';
import { Tile } from '@/components/layouts/Tile';
import { Fail2BanContext } from '@/context/fail2ban';
import { StatusContentTile } from '@/view/ip/components/StatusContentTile';

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

type IpParams = {
  jail: string;
  ip: string;
};

export const IpView: React.FC = () => {
  const { ip, jail } = useParams<keyof IpParams>() as IpParams;
  const navigate = useNavigate();
  const { jails } = useContext(Fail2BanContext);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { ref, width } = useResizeObserver();

  const jailData = jails?.find((j) => j.name === jail);
  const isBanned =
    jailData?.stats.ip_list.findIndex((jailIp) => jailIp.ip === ip) !== -1;

  const onGoBack = () => {
    navigate(-1);
  };

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
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={onGoBack}
          >
            <ShieldIcon sx={{ marginRight: 1 }} />
            <StyledTypography variant="h5" color="text.primary">
              {jail}
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
              sx={{ margin: 0.5 }}
              variant="contained"
              color="secondary"
            >
              <SaveIcon />
            </Button>
          </Tooltip>
        )}

        <BanUnbanButton
          ip={ip}
          jail={jail}
          isBanned={isBanned}
          onClick={() => setLoading(true)}
          onComplete={() => setLoading(false)}
        />

        <UpdateIpButton ip={ip} onComplete={() => {}} />
      </Box>

      {width && (
        <Grid width={width} type="ip" isEditMode={isEditMode}>
          <Box key="status">
            <Tile isEditMode={isEditMode} title="Status">
              <StatusContentTile
                loading={loading}
                isBanned={isBanned}
                isFailed={false}
              />
            </Tile>
          </Box>
        </Grid>
      )}
    </Root>
  );
};
