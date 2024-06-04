import { useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Fail2BanContext } from '@/context/fail2ban';
import fail2backService from '@/service/fail2back.service';
import { Jail } from '@/types/Jail';

type BanNowCardProps = {
  jail: Jail;
};

export const BanNowCard: React.FC<BanNowCardProps> = ({ jail }) => {
  const [value, setValue] = useState<string>('');
  const { refreshJails } = useContext(Fail2BanContext);
  const { enqueueSnackbar } = useSnackbar();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBan = async () => {
    const response = await fail2backService.postJailsBan(jail.name, value);
    if (response) {
      enqueueSnackbar(`Ip ${value} banned`, { variant: 'success' });
      refreshJails();
    } else {
      enqueueSnackbar(`Unable to ban Ip ${value}`, { variant: 'error' });
    }
  };

  return (
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Ban now
      </Typography>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          size="small"
          onChange={onChange}
          placeholder="Ip Address"
          value={value}
          fullWidth
          sx={{ marginRight: 2 }}
        />

        <Button variant="outlined" color="secondary" onClick={onBan}>
          Ban
        </Button>
      </Box>
    </>
  );
};
