import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Dashboard } from '@/view/dashboard/Dashboard';

import { TabsNavigation } from './TabsNavigation';

export const Navigation: React.FC = () => {
  return (
    <HashRouter>
      <TabsNavigation />
      <Routes>
        <Route path="dashboard" index element={<Dashboard />} />
        <Route path="jails" element={<></>} />
        <Route path="bans" element={<></>} />
        <Route path="history" element={<></>} />
      </Routes>
    </HashRouter>
  );
};
