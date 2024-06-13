import React from 'react';
import { Drawer } from '@mui/material';

import { SideBarContent } from '@/components/sidebar/SideBarContent';

type MobileSideBarProps = { isOpen: boolean; onClose: () => void };

export const MobileSideBar: React.FC<MobileSideBarProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 240,
        },
        '& .MuiTabs-indicator': {
          width: 4,
        },
      }}
      anchor="left"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <SideBarContent isMobile={true} />
    </Drawer>
  );
};
