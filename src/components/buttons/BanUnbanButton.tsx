import { useContext } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@/components/buttons/LoadingButton';
import { Fail2BanContext } from '@/context/fail2ban';
import Fail2BackService from '@/service/fail2back.service';

type BanUnbanButtonProps = {
  jail: string;
  ip: string;
  isBanned: boolean;
};

export const BanUnbanButton: React.FC<BanUnbanButtonProps> = ({
  jail,
  ip,
  isBanned,
}) => {
  const { refreshJail } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();

  const onBan = async (): Promise<boolean> => {
    const result = await Fail2BackService.postJailsBan(jail, ip);
    return result;
  };

  const onBanComplete = (result: boolean) => {
    refreshJail(jail);
    if (result) enqueueSnackbar('IP banned', { variant: 'success' });
    else enqueueSnackbar('Failed to ban IP', { variant: 'error' });
  };

  const onUnban = async (): Promise<boolean> => {
    const result = await Fail2BackService.postJailsUnban(jail, ip);
    return result;
  };

  const onUnbanComplete = (result: boolean) => {
    refreshJail(jail);
    if (result) enqueueSnackbar('IP unbanned', { variant: 'success' });
    else enqueueSnackbar('Failed to unban IP', { variant: 'error' });
  };

  const Button = isBanned ? (
    <LoadingButton
      onClick={onUnban}
      onComplete={onUnbanComplete}
      variant="contained"
      color="primary"
      startIcon={<CheckIcon />}
    >
      Unban
    </LoadingButton>
  ) : (
    <LoadingButton
      onClick={onBan}
      onComplete={onBanComplete}
      variant="contained"
      color="secondary"
      startIcon={<BlockIcon />}
    >
      Ban
    </LoadingButton>
  );

  return Button;
};
