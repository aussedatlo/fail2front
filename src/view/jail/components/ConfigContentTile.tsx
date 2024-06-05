import { Box, Typography } from '@mui/material';

import { Jail } from '@/types/Jail';

type ConfigContentTileProps = {
  jail: Jail;
};

export const ConfigContentTile: React.FC<ConfigContentTileProps> = ({
  jail,
}) => {
  return (
    <>
      {jail.filter.file_list.map((file) => (
        <Box key={`file-${file}`}>
          <Typography>{file}</Typography>
        </Box>
      ))}
    </>
  );
};
