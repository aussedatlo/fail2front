import React, { useContext } from 'react';
import { Flex, Typography } from 'antd';
import styled, { useTheme } from 'styled-components';

import { Fail2BanContext } from '@/context/fail2ban';

const Root = styled(Flex)`
  margin: auto;
  max-width: 750px;
`;

const StyledCard = styled(Flex)`
  border: 2px solid ${(props) => props.theme.antd.colorError};
  border-radius: ${(props) => props.theme.antd.borderRadiusSM}px;
  background-color: ${(props) => props.theme.antd.colorBgLayout};
  margin: ${(props) => props.theme.antd.marginXS}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Dashboard: React.FC = () => {
  const { bans } = useContext(Fail2BanContext);
  const theme = useTheme();

  console.log(theme.antd.colorError);

  return (
    <Root>
      <StyledCard>
        <Typography.Title level={2} type="danger">
          {bans?.length}
        </Typography.Title>
        <Typography.Text>active bans</Typography.Text>
      </StyledCard>

      <StyledCard>
        <Typography.Title level={2} type="danger">
          {bans?.length}
        </Typography.Title>
        <Typography.Text>active bans</Typography.Text>
      </StyledCard>

      <StyledCard>
        <Typography.Title level={2} type="danger">
          {bans?.length}
        </Typography.Title>
        <Typography.Text>active bans</Typography.Text>
      </StyledCard>

      <StyledCard>
        <Typography.Title level={2} type="danger">
          {bans?.length}
        </Typography.Title>
        <Typography.Text>active bans</Typography.Text>
      </StyledCard>
    </Root>
  );
};
