import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, styled } from '@mui/material';

import { Sidebar } from '@/navigation/Sidebar';
import { DashboardView } from '@/view/dashboard/Dashboard';
import { IpView } from '@/view/ip/Ip';
import { JailView } from '@/view/jail/Jail';

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
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

export const Navigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Root>
        <Sidebar />
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
