import { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShieldIcon from '@mui/icons-material/Shield';
import { Box, styled, Tab, Tabs } from '@mui/material';

import { Fail2BanContext } from '@/context/fail2ban';
import { HealthCheck } from '@/navigation/HealthCheck';
import { RoutePaths } from '@/navigation/Navigation';

const StyledTabs = styled(Tabs)`
  border-color: divider;
  border-right: 1px;
  width: 200px;
`;

const StyledTab = styled(Tab)`
  text-transform: none;
  align-items: center;
  justify-content: start;
  min-height: 50px;
`;

export const Sidebar: React.FC = () => {
  const [value, setValue] = useState<string>('dashboard');
  const { jails, healthBack, healthBan } = useContext(Fail2BanContext);
  const navigate = useNavigate();

  const onChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onJailClick = (name: string) => {
    console.log(RoutePaths.Jail.replace(':jail', name));
    navigate(RoutePaths.Jail.replace(':jail', name));
  };

  const onDashboardClick = () => {
    navigate(RoutePaths.Dashboard);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <StyledTabs
        orientation="vertical"
        variant="scrollable"
        aria-label="Vertical tabs example"
        value={value}
        onChange={onChange}
      >
        <StyledTab
          icon={<DashboardIcon fontSize="small" />}
          iconPosition="start"
          label="Dashboard"
          value="dashboard"
          disableRipple
          onClick={onDashboardClick}
        />

        {jails &&
          jails.map((jail) => (
            <StyledTab
              icon={<ShieldIcon fontSize="small" />}
              iconPosition="start"
              key={`jail-${jail.name}`}
              label={jail.name}
              value={jail.name}
              disableRipple
              onClick={() => onJailClick(jail.name)}
            />
          ))}
      </StyledTabs>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 1 }}>
        <HealthCheck title="fail2ban" health={healthBan} />
        <HealthCheck title="fail2back" health={healthBack} />
      </Box>
    </Box>
  );
};
