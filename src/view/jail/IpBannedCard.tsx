import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table } from '@/components/Table';
import { IpContext } from '@/context/ip';
import { useSize } from '@/provider/SizeProvider';
import { Jail } from '@/types/Jail';

type IpBannedCardProps = {
  jail: Jail;
};

type IpData = {
  ip: string;
  country: string;
  city: string;
  provider: string;
  flag: string;
};

export const IpBannedCard: React.FC<IpBannedCardProps> = ({ jail }) => {
  const { ipInfos, addIp, isLoaded } = useContext(IpContext);
  const height = useSize().height ?? 0;
  const navigate = useNavigate();

  // height - 180 because of the pagination / 40 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  useEffect(() => {
    if (!isLoaded) return;

    jail.stats.ip_list.forEach(({ ip }) => {
      if (!ipInfos[ip]) {
        addIp(ip);
      }
    });
  }, [addIp, ipInfos, isLoaded, jail]);

  const data: IpData[] = useMemo(() => {
    return jail.stats.ip_list.map(({ ip }) => {
      const ipInfo = ipInfos[ip];

      return {
        ip,
        country: ipInfo?.country ?? 'Unknown',
        flag: ipInfo?.flag?.emoji ?? '',
        city: ipInfo?.city ?? 'Unknown',
        provider: ipInfo?.connection?.isp ?? 'Unknown',
      };
    });
  }, [ipInfos, jail]);

  const formatter = (item: IpData) => {
    const { ip, country, city, provider, flag } = item;
    return {
      ip,
      city,
      country: (
        <>
          <span style={{ marginRight: 8 }}>{flag}</span>
          {country}
        </>
      ),
      provider,
    };
  };

  const onClick = (item: IpData) => {
    navigate(`/jail/${jail.name}/${item.ip}`);
  };

  return (
    <Table
      labels={['Ip', 'Country', 'City', 'Provider']}
      rowsPerPage={rowsPerPage}
      colsWidth={['20%', '20%', '20%', '40%']}
      formatter={formatter}
      data={data}
      onClick={onClick}
    />
  );
};
