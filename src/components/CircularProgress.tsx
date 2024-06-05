import {
  CircularProgress as MuiCircularProgress,
  useTheme,
} from '@mui/material';

export const CircularProgress: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.palette.secondary.main} />
            <stop offset="100%" stopColor={theme.palette.primary.main} />
          </linearGradient>
        </defs>
      </svg>
      <MuiCircularProgress
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
    </>
  );
};
