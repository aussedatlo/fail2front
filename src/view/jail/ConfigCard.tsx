import { Box, Typography } from '@mui/material';

import { Jail } from '@/types/Jail';

type ConfigCardProps = {
  jail: Jail;
};

export const ConfigCard: React.FC<ConfigCardProps> = ({ jail }) => {
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
