import { Box } from '@mui/material';

import { SideBarContent } from '@/components/sidebar/SideBarContent';

export const DesktopSideBar: React.FC = () => {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'block' },
        width: 260,
        height: '100%',
      }}
    >
      <SideBarContent />
    </Box>
  );
};
