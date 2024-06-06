import { useContext } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@/components/buttons/LoadingButton';
import { Fail2BanContext } from '@/context/fail2ban';
import Fail2BackService from '@/service/fail2back.service';

type BanButtonProps = {
  jail: string;
  ip: string;
};

export const BanButton: React.FC<BanButtonProps> = ({ jail, ip }) => {
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

  return (
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
};
