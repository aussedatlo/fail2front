import { SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShieldIcon from '@mui/icons-material/Shield';
import { Box, styled, Tab, Tabs } from '@mui/material';

import { HealthCheck } from '@/components/sidebar/HealthCheck';
import { Fail2BanContext } from '@/context/fail2ban';
import { RoutePaths } from '@/navigation/Navigation';

const StyledTabs = styled(Tabs)``;

const StyledTab = styled(Tab)`
  text-transform: none;
  align-items: center;
  justify-content: start;
  min-height: 50px;
  font-size: 1.2em;
`;

type SideBarContentProps = {
  isMobile?: boolean;
};

export const SideBarContent: React.FC<SideBarContentProps> = ({
  isMobile = false,
}) => {
  const [value, setValue] = useState<string>('dashboard');
  const { jails, healthBack, healthBan } = useContext(Fail2BanContext);
  const navigate = useNavigate();

  const onChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onJailClick = (name: string) => {
    navigate(RoutePaths.Jail.replace(':jail', name));
  };

  const onDashboardClick = () => {
    navigate(RoutePaths.Dashboard);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: isMobile ? 'background.paper' : 'background.default',
      }}
    >
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
