import { useContext } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import { useSnackbar } from 'notistack';

import {
  LoadingButton,
  LoadingButtonProps,
} from '@/components/buttons/LoadingButton';
import { Fail2BanContext } from '@/context/fail2ban';
import Fail2BackService from '@/service/fail2back.service';

type BanButtonProps = {
  jailName: string;
  ip: string;
} & Omit<LoadingButtonProps<boolean>, 'onClick'>;

export const BanButton: React.FC<BanButtonProps> = ({
  jailName,
  ip,
  onComplete,
}) => {
  const { refreshJail } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();

  const onBan = async (): Promise<boolean> => {
    const result = await Fail2BackService.postJailsBan(jailName, ip);
    return result;
  };

  const onBanComplete = (
    result: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    refreshJail(jailName);
    if (result) enqueueSnackbar('IP banned', { variant: 'success' });
    else enqueueSnackbar('Failed to ban IP', { variant: 'error' });
    onComplete && onComplete(result, setLoading);
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
