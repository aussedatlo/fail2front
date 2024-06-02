import CircleIcon from '@mui/icons-material/Circle';
import { Box, styled, Tooltip, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const blink = keyframes`
  0% { opacity: 1; }
  40% { opacity: 1; }
  50% { opacity: 0.4; }
  60% { opacity: 1; }
  100% { opacity: 1; }
`;

const BlinkedCircleIcon = styled(CircleIcon)`
  animation: ${blink} 3s linear infinite;
`;

type HealthCheckProps = {
  title: string;
  health: boolean;
};

export const HealthCheck: React.FC<HealthCheckProps> = ({ title, health }) => {
  return (
    <Tooltip title={health ? 'Healthy' : 'Unhealthy'} arrow placement="top">
      <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
        <Typography variant="caption">{title}</Typography>
        <BlinkedCircleIcon
          sx={{ marginLeft: 1, fontSize: 8 }}
          color={health ? 'primary' : 'secondary'}
        />
      </Box>
    </Tooltip>
  );
};
