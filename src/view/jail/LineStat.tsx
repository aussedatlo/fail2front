import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { areaElementClasses, LineChart } from '@mui/x-charts/LineChart';

type LineStatProps = {
  data: number[];
  labels: string[];
  value: number;
  stat: string;
  color: string;
};

export const LineStat: React.FC<LineStatProps> = ({
  data,
  labels,
  value,
  stat,
  color,
}) => {
  return (
    <>
      <Grid item xs={3} lg={2}>
        <Card sx={{ display: 'flex', height: '100%' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {stat}
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
      </Grid>

      <Grid item xs={9} lg={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {stat} over time
            </Typography>

            <Box sx={{ margin: -6, marginTop: -8, marginBottom: -7 }}>
              <LineChart
                height={220}
                series={[{ data, area: true }]}
                leftAxis={null}
                bottomAxis={null}
                axisHighlight={{ x: 'none', y: 'band' }}
                colors={[color]}
                xAxis={[
                  {
                    scaleType: 'point',
                    data: labels,
                  },
                ]}
                yAxis={[
                  {
                    scaleType: 'linear',
                  },
                ]}
                sx={{
                  [`& .${areaElementClasses.root}`]: {
                    fill: color + '25',
                  },
                }}
              ></LineChart>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
