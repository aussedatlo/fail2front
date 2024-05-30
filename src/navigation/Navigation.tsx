import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Box, styled } from '@mui/material';

import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/view/dashboard/Dashboard';

// eslint-disable-next-line react-refresh/only-export-components
export enum RoutePaths {
  Dashboard = 'dashboard',
  Jails = 'jails',
}

export type RouteType = { path: RoutePaths; component: React.ReactElement };

const routes: RouteType[] = [
  { path: RoutePaths.Dashboard, component: <Dashboard /> },
  { path: RoutePaths.Jails, component: <>Test</> },
];

const Root = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const Navigation: React.FC = () => {
  return (
    <HashRouter>
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
    </HashRouter>
  );
};
