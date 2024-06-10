import React from 'react';
import {
  BoxProps,
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';

import { SizeProvider } from '@/provider/SizeProvider';

type TileProps = {
  isEditMode: boolean;
  title: string;
} & BoxProps;

export const Tile: React.FC<TileProps> = ({
  children,
  isEditMode,
  title,
  ...props
}) => {
  const theme = useTheme();

  return (
    <SizeProvider sx={{ display: 'flex', height: '100%', flex: 1 }} {...props}>
      <Card
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          userSelect: isEditMode ? 'none' : 'auto',
          cursor: isEditMode ? 'grab' : 'auto',
          outline: isEditMode
            ? `2px solid ${theme.palette.primary.main}80`
            : 'none',
          color: theme.palette.primary.main,
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>

          {children}
        </CardContent>
      </Card>
    </SizeProvider>
  );
};
