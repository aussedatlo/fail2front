import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsProps } from 'antd';
import styled from 'styled-components';

const Title = styled.div`
  position: absolute;
  font-size: 2em;
  top: 0;
`;

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

export const TabsNavigation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Tabs
      tabBarExtraContent={{
        left: <Title>Fail2Front</Title>,
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
