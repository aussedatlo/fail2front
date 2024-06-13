import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import BlockIcon from '@mui/icons-material/Block';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';

import { Table } from '@/components/layouts/Table';
import { useSize } from '@/provider/SizeProvider';
import { Event } from '@/types/Event';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '100em',
  },
});

type LastEventsContentTileProps = {
  jailName: string;
  events: Event[];
};

export const LastEventsContentTile: React.FC<LastEventsContentTileProps> = ({
  jailName,
  events,
}) => {
  const height = useSize().height ?? 0;
  const navigate = useNavigate();

  // height - 150 because of the pagination / 50 because of the row height
  const rowsPerPage = Math.ceil((height - 180) / 40);

  const formatter = (row: Event) => {
    const { date, type, ip, match } = row;

    return {
      date: <ReactTimeAgo date={Number(date)} />,
      type:
        type === 'Banned' ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BlockIcon
              color="secondary"
              sx={{ width: '0.8em', marginRight: 1 }}
            />{' '}
            Banned
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon
              color="primary"
              sx={{ width: '0.8em', marginRight: 1 }}
            />{' '}
            Failed
          </Box>
        ),
      ip,
      match: (
        <CustomWidthTooltip title={match} arrow placement="bottom-start">
          <Typography noWrap variant="body2">
            {match}
          </Typography>
        </CustomWidthTooltip>
      ),
    };
  };

  return (
    <Table
      labels={['Date', 'Type', 'IP', 'Match']}
      rowsPerPage={rowsPerPage}
      colsWidth={['155px', '130px', '165px']}
      data={events}
      formatter={formatter}
      onClick={(row) => navigate(`/jail/${jailName}/${row.ip}`)}
    />
  );
};
