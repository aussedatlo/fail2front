import { useContext } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@/components/LoadingButton';
import { Fail2BanContext } from '@/context/fail2ban';
import Fail2BackService from '@/service/fail2back.service';

type BanUnbanButtonProps = {
  onComplete: () => void;
  onClick: () => void;
  jail: string;
  ip: string;
  isBanned: boolean;
};

export const BanUnbanButton: React.FC<BanUnbanButtonProps> = ({
  onClick,
  onComplete,
  jail,
  ip,
  isBanned,
}) => {
  const { refreshJail } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();

  const onBan = async (): Promise<boolean> => {
    onClick();
    const result = await Fail2BackService.postJailsBan(jail, ip);
    refreshJail(jail);
    return result;
  };

  const onBanDone = (result: boolean) => {
    if (result) enqueueSnackbar('IP banned', { variant: 'success' });
    else enqueueSnackbar('Failed to ban IP', { variant: 'error' });
    onComplete();
  };

  const onUnban = async (): Promise<boolean> => {
    onClick();
    const result = await Fail2BackService.postJailsUnban(jail, ip);
    refreshJail(jail);
    return result;
  };

  const onUnbanDone = (result: boolean) => {
    if (result) enqueueSnackbar('IP unbanned', { variant: 'success' });
    else enqueueSnackbar('Failed to unban IP', { variant: 'error' });
    onComplete();
  };

  const Button = isBanned ? (
    <LoadingButton
      onClick={onUnban}
      onComplete={onUnbanDone}
      variant="contained"
      color="primary"
      startIcon={<CheckIcon />}
    >
      Unban
    </LoadingButton>
  ) : (
    <LoadingButton
      onClick={onBan}
      onComplete={onBanDone}
      variant="contained"
      color="secondary"
      startIcon={<BlockIcon />}
    >
      Ban
    </LoadingButton>
  );

  return Button;
};
