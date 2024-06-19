import React from 'react';
import { Box, Typography } from '@mui/material';

import { IpInfos } from '@/types/IpInfos';

type LineProps = {
  label: string;
  value: string | React.ReactNode;
};

const Line = ({ label, value }: LineProps) => (
  <Box
    sx={{
      display: 'flex',
      borderBottom: 1,
      borderColor: 'divider',
      padding: 0.5,
    }}
  >
    <Typography noWrap color="text.primary">
      {label}
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'end',
      }}
    >
      <Typography noWrap color="text.secondary">
        {value}
      </Typography>
    </Box>
  </Box>
);

type IpInfosContentTileProps = {
  ipInfos: IpInfos;
};

export const IpInfosContentTile: React.FC<IpInfosContentTileProps> = ({
  ipInfos,
}) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Line label="IP address" value={ipInfos.ip} />
      <Line label="City" value={ipInfos.city} />
      <Line label="Region" value={ipInfos.region} />
      <Line
        label="Country"
        value={
          <>
            <span style={{ marginRight: 8 }}>{ipInfos.flag?.emoji}</span>
            {ipInfos.country}
          </>
        }
      />
      <Line label="ISP" value={ipInfos.connection?.isp} />
      <Line label="Type" value={ipInfos.type} />
      <Line label="Latitude" value={ipInfos.latitude} />
      <Line label="Longitude" value={ipInfos.longitude} />
    </Box>
  );
};
