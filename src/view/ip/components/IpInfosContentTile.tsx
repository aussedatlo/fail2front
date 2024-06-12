import React, { useContext, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { IpContext } from '@/context/ip';

type IpInfosContentTileProps = {
  ip: string;
};

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

export const IpInfosContentTile: React.FC<IpInfosContentTileProps> = ({
  ip,
}) => {
  const { addIp, ipInfos } = useContext(IpContext);

  useEffect(() => {
    if (ipInfos[ip] === undefined) {
      addIp(ip);
    }
  }, [ip, addIp, ipInfos]);

  if (!ipInfos[ip]) return null;

  return (
    <Box sx={{ marginTop: 2 }}>
      <Line label="IP address" value={ipInfos[ip].ip} />
      <Line label="City" value={ipInfos[ip].city} />
      <Line label="Region" value={ipInfos[ip].region} />
      <Line
        label="Country"
        value={
          <>
            <span style={{ marginRight: 8 }}>{ipInfos[ip].flag.emoji}</span>
            {ipInfos[ip].country}
          </>
        }
      />
      <Line label="ISP" value={ipInfos[ip].connection.isp} />
      <Line label="Type" value={ipInfos[ip].type} />
      <Line label="Latitude" value={ipInfos[ip].latitude} />
      <Line label="Longitude" value={ipInfos[ip].longitude} />
    </Box>
  );
};
