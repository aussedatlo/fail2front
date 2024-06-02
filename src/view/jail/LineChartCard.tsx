import { Box, Card, CardContent, Typography } from '@mui/material';
import { areaElementClasses, LineChart } from '@mui/x-charts';

type LineChartCardProps = {
  data: number[];
  labels: string[];
  title: string;
  color: string;
};

export const LineChartCard: React.FC<LineChartCardProps> = ({
  data,
  labels,
  title,
  color,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ margin: -6, marginTop: -8, marginBottom: -7 }}>
          <LineChart
            height={200}
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
  );
};
