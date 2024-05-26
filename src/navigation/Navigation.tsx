import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/view/dashboard/Dashboard';

import { TabsNavigation } from './TabsNavigation';

// eslint-disable-next-line react-refresh/only-export-components
export enum RoutePaths {
  Dashboard = 'dashboard',
  Jails = 'jails',
  Bans = 'bans',
  History = 'history',
}

export type RouteType = { path: RoutePaths; component: React.ReactElement };

const routes: RouteType[] = [
  { path: RoutePaths.Dashboard, component: <Dashboard /> },
  { path: RoutePaths.Jails, component: <></> },
  { path: RoutePaths.Bans, component: <></> },
  { path: RoutePaths.History, component: <></> },
];

export const Navigation: React.FC = () => {
  return (
    <HashRouter>
      <TabsNavigation routes={routes} />
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.component} />
        ))}
      </Routes>
    </HashRouter>
  );
};