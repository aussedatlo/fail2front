import { Box, Typography } from '@mui/material';
import { areaElementClasses, LineChart } from '@mui/x-charts';

import { useSize } from '@/provider/SizeProvider';

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
  const height = useSize().height ?? 0;

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          marginTop: -8,
          marginLeft: -7,
          marginRight: -7,
          height: '150%',
        }}
      >
        <LineChart
          height={height + 60}
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
    </>
  );
};
