import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import styled from 'styled-components';

import { RouteType } from '@/navigation/Navigation';

const Title = styled.div`
  position: absolute;
  font-size: 2em;
  top: 0;
`;

type TabProps = { key: string; label: string };

type TabsNavigationProps = {
  routes: RouteType[];
};

export const TabsNavigation: React.FC<TabsNavigationProps> = ({ routes }) => {
  const navigate = useNavigate();

  const items = useMemo(
    () =>
      routes.reduce(
        (prev: TabProps[], curr: RouteType) => [
          ...prev,
          { key: curr.path, label: curr.path },
        ],
        [],
      ),
    [routes],
  );

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
