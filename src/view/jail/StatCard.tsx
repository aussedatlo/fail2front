import { Box, Card, CardContent, Typography } from '@mui/material';

type StatCardProps = {
  value: number;
  title: string;
  color: string;
};

export const StatCard: React.FC<StatCardProps> = ({ value, title, color }) => {
  return (
    <Card sx={{ display: 'flex', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
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
          <Typography variant="h3" component="div" color={color}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
