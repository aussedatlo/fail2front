import { Box, Card, CardContent, Typography } from '@mui/material';

import { Jail } from '@/types/Jail';

type ConfigCardProps = {
  jail: Jail;
};

export const ConfigCard: React.FC<ConfigCardProps> = ({ jail }) => {
  return (
    <Card>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', maxHeight: '32em' }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          File list
        </Typography>
        <Typography>
          {jail.filter.file_list.map((file) => (
            <Box>{file}</Box>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};
