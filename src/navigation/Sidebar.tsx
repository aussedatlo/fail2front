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
  const [value, setValue] = useState<string>('dashboard');
  const { jails, isLoaded } = useContext(Fail2BanContext);
  const navigate = useNavigate();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);

    if (newValue === 'dashboard') {
      navigate(RoutePaths.Dashboard);
    } else {
      navigate(RoutePaths.Jails, { state: { jail: newValue } });
    }
  };

  return (
    <>
      <StyledTabs
        orientation="vertical"
        variant="scrollable"
        aria-label="Vertical tabs example"
        value={value}
        onChange={handleChange}
      >
        <StyledTab label="Dashboard" value="dashboard" />
        <Subtitle variant="subtitle2">Jails</Subtitle>
        {isLoaded &&
          jails &&
          jails.map((jail) => (
            <StyledTab
              key={`jail-${jail.name}`}
              label={jail.name}
              value={jail.name}
              disableRipple
            />
          ))}
      </StyledTabs>
    </>
  );
};
