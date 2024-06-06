import { useContext } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';

import { LoadingButton } from '@/components/buttons/LoadingButton';
import { IpContext } from '@/context/ip';

type UpdateIpButtonProps = {
  ip: string;
};

export const UpdateIpButton: React.FC<UpdateIpButtonProps> = ({ ip }) => {
  const { addIp } = useContext(IpContext);

  const onUpdateIp = async (): Promise<void> => {
    console.log('onUpdateIp', false);
    addIp(ip, false);
  };

  return (
    <LoadingButton
      onClick={onUpdateIp}
      variant="contained"
      color="primary"
      startIcon={<ReplayIcon />}
    >
      Update
    </LoadingButton>
  );
};
