import { useContext } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';

import { LoadingButton } from '@/components/LoadingButton';
import { IpContext } from '@/context/ip';

type UpdateIpButtonProps = {
  onComplete: () => void;
  ip: string;
};

export const UpdateIpButton: React.FC<UpdateIpButtonProps> = ({
  onComplete,
  ip,
}) => {
  const { addIp } = useContext(IpContext);

  const onUpdateIp = async (): Promise<void> => {
    console.log('onUpdateIp', false);
    addIp(ip, false);
  };

  return (
    <LoadingButton
      onClick={onUpdateIp}
      onComplete={onComplete}
      variant="contained"
      color="primary"
      startIcon={<ReplayIcon />}
    >
      Update
    </LoadingButton>
  );
};
