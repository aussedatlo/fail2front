import { useContext } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { AppContext } from '@/context/app';

export const AppBar: React.FC = () => {
  const theme = useTheme();
  const { setTheme } = useContext(AppContext);

  const onChangeTheme = () => {
    setTheme(theme.palette.mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fail2Front
        </Typography>
        <IconButton onClick={onChangeTheme}>
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};
