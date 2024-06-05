import { useContext, useEffect, useState } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { Fail2BanContext } from '@/context/fail2ban';
import Fail2BackService from '@/service/fail2back.service';

type BanUnbanButtonProps = {
  onLoadingChange: (loading: boolean) => void;
  jail: string;
  ip: string;
  isBanned: boolean;
};

export const BanUnbanButton: React.FC<BanUnbanButtonProps> = ({
  onLoadingChange,
  jail,
  ip,
  isBanned,
}) => {
  const { refreshJail } = useContext(Fail2BanContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    onLoadingChange(loading);
  }, [loading, onLoadingChange]);

  const Button = isBanned ? (
    <LoadingButton
      onClick={onUnban}
      variant="contained"
      color="primary"
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
  );

  return Button;
};
