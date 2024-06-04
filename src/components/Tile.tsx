import React from 'react';
import { Card, CardContent, CardProps,useTheme } from '@mui/material';

type TileProps = {
  isEditMode: boolean;
} & CardProps;

export const Tile: React.FC<TileProps> = ({
  children,
  isEditMode,
  ...props
}) => {
  const theme = useTheme();

  return (
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
      {...props}
    >
      <CardContent sx={{ flexGrow: 1 }}>{children}</CardContent>
    </Card>
  );
};
