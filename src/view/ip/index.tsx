import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LanIcon from '@mui/icons-material/Lan';
import SaveIcon from '@mui/icons-material/Save';
import ShieldIcon from '@mui/icons-material/Shield';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Breadcrumbs,
  Button,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import useResizeObserver from 'use-resize-observer';

import { Grid } from '@/components/Grid';
import { Tile } from '@/components/Tile';
import { Fail2BanContext } from '@/context/fail2ban';
import Fail2BackService from '@/service/fail2back.service';
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
  const { jails, refreshJail } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { ref, width } = useResizeObserver();

  const jailData = jails?.find((j) => j.name === jail);
  const isBanned =
    jailData?.stats.ip_list.findIndex((jailIp) => jailIp.ip === ip) !== -1;

  const onGoBack = () => {
    navigate(-1);
  };

  const onBan = async () => {
    setLoading(true);
    const result = await Fail2BackService.postJailsBan(jail, ip);
    refreshJail(jail);
    setTimeout(() => {
      if (result) enqueueSnackbar('IP banned', { variant: 'success' });
      else enqueueSnackbar('Failed to ban IP', { variant: 'error' });
      setLoading(false);
    }, 1000);
  };

  const onUnban = async () => {
    setLoading(true);
    const result = await Fail2BackService.postJailsUnban(jail, ip);
    refreshJail(jail);
    setTimeout(() => {
      if (result) enqueueSnackbar('IP unbanned', { variant: 'success' });
      else enqueueSnackbar('Failed to unban IP', { variant: 'error' });
      setLoading(false);
    }, 1000);
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
              sx={{ marginRight: 1 }}
              variant="contained"
              color="secondary"
            >
              <SaveIcon />
            </Button>
          </Tooltip>
        )}

        {isBanned ? (
          <LoadingButton
            onClick={onUnban}
            variant="contained"
            startIcon={<CheckIcon />}
            loading={loading}
            sx={{ width: '7em' }}
          >
            Unban
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={onBan}
            variant="contained"
            color="secondary"
            startIcon={<BlockIcon />}
            loading={loading}
            sx={{ width: '7em' }}
          >
            Ban
          </LoadingButton>
        )}
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
