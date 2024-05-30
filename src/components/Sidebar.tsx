import { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Tab, Tabs, Typography } from '@mui/material';

import { Fail2BanContext } from '@/context/fail2ban';
import { RoutePaths } from '@/navigation/Navigation';

const StyledTabs = styled(Tabs)`
  border-color: divider;
  border-right: 1px;
  width: 200px;
`;

const StyledTab = styled(Tab)`
  text-transform: none;
  align-items: flex-start;
`;

const Subtitle = styled(Typography)`
  text-transform: uppercase;
  margin-left: 5px;
`;

export const Sidebar: React.FC = () => {
  const [value, setValue] = useState(0);
  const { jails } = useContext(Fail2BanContext);
  const navigate = useNavigate();

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);

    if (newValue === 0) {
      navigate(RoutePaths.Dashboard);
    } else {
      navigate(RoutePaths.Jails, { state: { jail: jails![newValue - 1] } });
    }
  };

  return (
    <StyledTabs
      orientation="vertical"
      variant="scrollable"
      aria-label="Vertical tabs example"
      value={value}
      onChange={handleChange}
    >
      <StyledTab label="Dashboard" />
      <Subtitle variant="subtitle2">Jails</Subtitle>
      {jails?.map((jail) => (
        <StyledTab key={`jail-${jail.name}`} label={jail.name} disableRipple />
      ))}
    </StyledTabs>
  );
};
