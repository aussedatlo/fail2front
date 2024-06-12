import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, styled } from '@mui/material';

import { AppBar } from '@/components/appbar/AppBar';
import { DesktopSideBar } from '@/components/sidebar/DesktopSideBar';
import { MobileSideBar } from '@/components/sidebar/MobileSideBar';
import { DashboardView } from '@/view/dashboard/Dashboard';
import { IpView } from '@/view/ip';
import { JailView } from '@/view/jail';

// eslint-disable-next-line react-refresh/only-export-components
export enum RoutePaths {
  Dashboard = '/',
  Jail = '/jail/:jail',
  JailIp = '/jail/:jail/:ip',
}

export type RouteType = { path: RoutePaths; component: React.ReactElement };

const routes: RouteType[] = [
  { path: RoutePaths.Dashboard, component: <DashboardView /> },
  { path: RoutePaths.Jail, component: <JailView /> },
  { path: RoutePaths.JailIp, component: <IpView /> },
];

const Root = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.paper};
  overflow: hidden;
`;

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <AppBar onMenuOpen={() => setIsOpen(true)} />
      <Root>
        <MobileSideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <DesktopSideBar />
        <Routes>
          {routes.map((route) => (
            <Route
              key={`nav-${route.path}`}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </Root>
    </BrowserRouter>
  );
};
