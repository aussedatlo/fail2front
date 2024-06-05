import { Box, Typography } from '@mui/material';

type StatContentTileProps = {
  value: number;
  color: string;
};

export const StatContentTile: React.FC<StatContentTileProps> = ({
  value,
  color,
}) => {
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
