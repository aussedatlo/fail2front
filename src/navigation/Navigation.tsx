import React from 'react';
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

export const Navigation: React.FC = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={() => {}} centered />
      <Dashboard />
    </>
  );
};
