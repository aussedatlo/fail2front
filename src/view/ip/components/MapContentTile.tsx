import { useContext } from 'react';
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
import { IpContext } from '@/context/ip';
import { useSize } from '@/provider/SizeProvider';

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

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
    throw new Error(
      `Cannot interpolate. Invalid points provided: ${x} ${JSON.stringify(points)}`,
    );
  }
}

type MapContentTileProps = {
  ip: string;
};

export default function MapContentTile({ ip }: MapContentTileProps) {
  const { ipInfos } = useContext(IpContext);
  const theme = useTheme();
  const { width = 0, height = 0 } = useSize();

  const fromCoords: [number, number] = [
    ipInfos[ip]?.longitude ?? 2.3522,
    ipInfos[ip]?.latitude ?? 48.8566,
  ];
  const toCoords: [number, number] = [2.3522, 48.8566];

  // Calculate the midpoint
  const midpoint: [number, number] = [
    (fromCoords[0] + toCoords[0]) / 2,
    (fromCoords[1] + toCoords[1]) / 2,
  ];

  // Calculate the distance
  const distance =
    calculateDistance(fromCoords[1], fromCoords[0], toCoords[1], toCoords[0]) ??
    0;

  // Determine the scale based on the distance
  const scale = linearInterpolation(distance, [
    { x: 0, y: 5000 },
    { x: 6000, y: 400 },
    { x: 10000, y: 300 },
    { x: 30000, y: 200 },
  ]);

  if (!ipInfos[ip] || !ipInfos?.host) return null;

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
                    geo.id ===
                      countries.alpha2ToAlpha3(ipInfos[ip].country_code) ||
                    geo.id ===
                      countries.alpha2ToAlpha3(ipInfos.host.country_code)
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
