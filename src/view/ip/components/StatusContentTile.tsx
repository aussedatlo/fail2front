import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Typography } from '@mui/material';

type StatusContentTileProps = {
  loading: boolean;
  isBanned: boolean;
  isFailed: boolean;
};

export const StatusContentTile: React.FC<StatusContentTileProps> = ({
  loading,
  isBanned,
  isFailed: _isFailed,
}) => {
  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : isBanned ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            marginTop: -2,
            marginLeft: -1,
          }}
        >
          <BlockIcon
            color="secondary"
            fontSize="large"
            sx={{ marginRight: 1 }}
          />
          <Typography color="text.primary" variant="h5">
            Banned
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            marginTop: -2,
            marginLeft: -1,
          }}
        >
          <CheckIcon color="primary" fontSize="large" sx={{ marginRight: 1 }} />
          <Typography color="text.primary" variant="h5">
            Not Banned
          </Typography>
        </Box>
      )}
    </>
  );
};
