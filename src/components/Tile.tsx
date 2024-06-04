import React from 'react';
import { BoxProps, Card, CardContent, useTheme } from '@mui/material';

import { SizeProvider } from '@/provider/SizeProvider';

type TileProps = {
  isEditMode: boolean;
} & BoxProps;

export const Tile: React.FC<TileProps> = ({
  children,
  isEditMode,
  ...props
}) => {
  const theme = useTheme();

  return (
    <SizeProvider sx={{ display: 'flex', height: '100%', flex: 1 }} {...props}>
      <Card
        sx={{
          display: 'flex',
          height: '100%',
          flex: 1,
          userSelect: isEditMode ? 'none' : 'auto',
          cursor: isEditMode ? 'grab' : 'auto',
          outline: isEditMode
            ? `2px solid ${theme.palette.primary.main}80`
            : 'none',
          color: theme.palette.primary.main,
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>{children}</CardContent>
      </Card>
    </SizeProvider>
  );
};
