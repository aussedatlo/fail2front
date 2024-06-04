import { Box, Typography } from '@mui/material';

type StatCardProps = {
  value: number;
  title: string;
  color: string;
};

export const StatCard: React.FC<StatCardProps> = ({ value, title, color }) => {
  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>

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
    </>
  );
};
