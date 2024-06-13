import { useNavigate } from 'react-router-dom';

import { Table } from '@/components/layouts/Table';
import { useSize } from '@/provider/SizeProvider';
import { IpInfos } from '@/types/IpInfos';

type IpInfosFormatted = {
  ip: string;
  country: JSX.Element;
  city: string;
  provider: string;
};

type BannedIpsContentTileProps = {
  jailName: string;
  ips: IpInfos[];
};

export const BannedIpsContentTile: React.FC<BannedIpsContentTileProps> = ({
  jailName,
  ips,
}) => {
  const height = useSize().height ?? 0;
  const navigate = useNavigate();

  // height - 180 because of the pagination / 40 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  const formatter = (item: IpInfos): IpInfosFormatted => {
    const { ip, country, city, flag, connection } = item;
    return {
      ip,
      city,
      country: (
        <>
          <span style={{ marginRight: 8 }}>{flag.emoji}</span>
          {country}
        </>
      ),
      provider: connection.isp,
    };
  };

  const onClick = (item: IpInfos) => {
    navigate(`/jail/${jailName}/${item.ip}`);
  };

  return (
    <Table
      labels={['Ip', 'Country', 'City', 'Provider']}
      rowsPerPage={rowsPerPage}
      colsWidth={['20%', '20%', '20%', '40%']}
      formatter={formatter}
      data={ips}
      onClick={onClick}
    />
  );
};
