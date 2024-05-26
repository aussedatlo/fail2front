import React from 'react';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Tabs, TabsProps } from 'antd';

import { Dashboard } from '@/view/dashboard/Dashboard';

const items: TabsProps['items'] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
  },
  {
    key: 'jails',
    label: 'Jails',
  },
  {
    key: 'bans',
    label: 'Bans',
  },
  {
    key: 'history',
    label: 'History',
  },
];

const TabsNavigation = () => {
  const navigate = useNavigate();
  return (
    <Tabs
      tabBarExtraContent={{
        left: (
          <h2 style={{ position: 'absolute', top: 0, margin: 5 }}>
            Fail2Front
          </h2>
        ),
      }}
      defaultActiveKey="1"
      items={items}
      onChange={(activeKey) => {
        navigate(activeKey);
      }}
      centered
    />
  );
};

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
