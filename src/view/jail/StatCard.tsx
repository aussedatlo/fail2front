import { Box, Typography } from '@mui/material';

type StatCardProps = {
  value: number;
  color: string;
};

export const StatCard: React.FC<StatCardProps> = ({ value, color }) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h3" color={color}>
        {value}
      </Typography>
    </Box>
  );
};
