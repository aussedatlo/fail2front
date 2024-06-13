import { useState } from 'react';
import { Box, TextField } from '@mui/material';

import { BanButton } from '@/components/buttons/BanButton';

type BanNowContentTileProps = {
  jailName: string;
};

export const BanNowContentTile: React.FC<BanNowContentTileProps> = ({
  jailName,
}) => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
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

      <BanButton
        jailName={jailName}
        ip={value}
        onComplete={(_arg, setLoading) => {
          setLoading(false);
        }}
      />
    </Box>
  );
};
