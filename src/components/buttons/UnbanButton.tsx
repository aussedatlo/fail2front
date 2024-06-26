import { useContext } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';

import { LoadingButton } from '@/components/buttons/LoadingButton';
import { Fail2BanContext } from '@/context/fail2ban';
import Fail2BackService from '@/service/fail2back.service';

type UnbanButtonProps = {
  jailName: string;
  ip: string;
};

export const UnbanButton: React.FC<UnbanButtonProps> = ({ jailName, ip }) => {
  const { refreshJail } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();

  const onUnban = async (): Promise<boolean> => {
    const result = await Fail2BackService.postJailsUnban(jailName, ip);
    return result;
  };

  const onUnbanComplete = (result: boolean) => {
    refreshJail(jailName);
    if (result) enqueueSnackbar('IP unbanned', { variant: 'success' });
    else enqueueSnackbar('Failed to unban IP', { variant: 'error' });
  };

  return (
    <LoadingButton
      onClick={onUnban}
      onComplete={onUnbanComplete}
      variant="contained"
      color="primary"
      startIcon={<CheckIcon />}
    >
      Unban
    </LoadingButton>
  );
};
