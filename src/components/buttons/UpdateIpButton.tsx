import { useContext } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';

import { LoadingButton } from '@/components/buttons/LoadingButton';
import { IpContext } from '@/context/ip';

type UpdateIpButtonProps = {
  ip: string;
};

export const UpdateIpButton: React.FC<UpdateIpButtonProps> = ({ ip }) => {
  const { registerIp } = useContext(IpContext);

  const onUpdateIp = async (): Promise<void> => {
    registerIp(ip, false);
  };

  const onUpdateIpComplete = (
    _result: void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setLoading(false);
  };

  return (
    <LoadingButton
      onClick={onUpdateIp}
      onComplete={onUpdateIpComplete}
      variant="contained"
      color="primary"
      startIcon={<ReplayIcon />}
    >
      Update
    </LoadingButton>
  );
};
