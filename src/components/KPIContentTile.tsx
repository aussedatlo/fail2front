import {TrendingDown, TrendingUp} from "@mui/icons-material";
import {Box, Tooltip, Typography, useTheme} from '@mui/material';

type KPIContentTileProps = {
  percent: number;
  unit: string;
};

export const KPIContentTile: React.FC<KPIContentTileProps> = ({
  percent,
  unit = "day"

}) => {
  const theme = useTheme();
  // round to 1 decimal
  percent = Math.round(percent * 10) / 10;

  const color = percent > 0 ? theme.palette.primary.main : theme.palette.secondary.main;
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
          <Tooltip title={(percent > 0 ? '+' : '') + percent + "% the last " + unit} arrow placement="top">
            <div>
              { percent > 0 ? (
                  <TrendingUp  fontSize="large" sx={{ verticalAlign: 'middle', marginRight: 1 }}/>
                  ) : (
                      <TrendingDown fontSize="large" sx={{ verticalAlign: 'middle', marginRight: 1 }}/>
                  )
              }
              {percent}%
            </div>
          </Tooltip>
      </Typography>
    </Box>
  );
};
