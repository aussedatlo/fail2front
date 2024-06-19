import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  ZoomableGroup,
} from 'react-simple-maps';
import { Box, useTheme } from '@mui/material';
import countries from 'i18n-iso-countries';

import MAP from '@/assets/map.json';
import { useGeoMetrics } from '@/hooks/useGeoMetrics';
import { useIpInfos } from '@/hooks/useIp';
import { useSize } from '@/provider/SizeProvider';

function linearInterpolation(
  x: number,
  points: { x: number; y: number }[],
): number {
  // Sort points by x-coordinate
  points.sort((a, b) => a.x - b.x);

  // Find the two points between which x lies
  let x0, y0, x1, y1;
  for (let i = 0; i < points.length - 1; i++) {
    if (points[i].x <= x && x <= points[i + 1].x) {
      x0 = points[i].x;
      y0 = points[i].y;
      x1 = points[i + 1].x;
      y1 = points[i + 1].y;
      break;
    }
  }

  // Perform linear interpolation
  if (
    x0 !== undefined &&
    y0 !== undefined &&
    x1 !== undefined &&
    y1 !== undefined
  ) {
    return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
  } else {
    console.log("Couldn't find interpolation points");
    return 5000;
  }
}

type MapContentTileProps = {
  ip: string;
};

export default function MapContentTile({ ip }: MapContentTileProps) {
  const theme = useTheme();
  const { width = 0, height = 0 } = useSize();
  const { distance, midpoint, fromCoords, toCoords } = useGeoMetrics(ip);
  const ipInfos = useIpInfos(ip);
  const hostInfos = useIpInfos('host');

  // Determine the scale based on the distance
  const scale = linearInterpolation(distance, [
    { x: 0, y: 5000 },
    { x: 1000, y: 1000 },
    { x: 6000, y: 200 },
    { x: 10000, y: 150 },
    { x: 30000, y: 150 },
  ]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          scale,
          center: midpoint,
        }}
        width={width}
        height={height - 50}
      >
        <ZoomableGroup minZoom={0.5}>
          <Geographies geography={MAP}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    geo.id === countries.alpha2ToAlpha3(ipInfos.country_code) ||
                    geo.id === countries.alpha2ToAlpha3(hostInfos.country_code)
                      ? theme.palette.primary.dark
                      : theme.palette.action.disabledBackground
                  }
                  stroke={theme.palette.primary.main}
                  strokeWidth={1.5}
                />
              ))
            }
          </Geographies>

          <Line
            from={fromCoords}
            to={toCoords}
            stroke={theme.palette.secondary.main}
            strokeWidth={5}
            strokeLinecap="round"
          />
        </ZoomableGroup>
      </ComposableMap>
    </Box>
  );
}
