import React, { useContext } from 'react';
import { Box, styled } from '@mui/material';

import { Fail2BanContext } from '@/context/fail2ban';

const Root = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(3)};
  flex: 1;
`;

export const DashboardView: React.FC = () => {
  const { bans } = useContext(Fail2BanContext);

  return (
    <Root>
      <div>{bans?.length}</div>
    </Root>
  );
};
