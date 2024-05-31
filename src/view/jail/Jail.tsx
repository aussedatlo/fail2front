import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShieldIcon from '@mui/icons-material/Shield';
import { Box, Button, Grid, styled, Typography, useTheme } from '@mui/material';

import { Fail2BanContext } from '@/context/fail2ban';
import { LineStat } from '@/view/jail/LineStat';

const Root = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(3)};
  flex: 1;
`;
const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

export const JailView: React.FC = () => {
  const { jail } = useParams();
  const { jails } = useContext(Fail2BanContext);
  const theme = useTheme();

  const jailData = jails?.find((j) => j.name === jail);

  const data1 = [20, 12, 14, 18, 26, 20, 22];
  const data2 = [...data1].reverse();

  const labels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];

  if (!jailData) {
    return null;
  }

  return (
    <Root>
      <TitleContainer>
        <ShieldIcon fontSize="large" sx={{ marginRight: 2 }} />
        <Typography variant="h5">{jailData.name}</Typography>

        <Box sx={{ flex: 1 }} />

        <Button
          startIcon={<DeleteOutlineIcon />}
          variant="contained"
          color="secondary"
        >
          Disable
        </Button>
      </TitleContainer>

      <Grid container sx={{ flexGrow: 1 }} spacing={3}>
        <LineStat
          data={data1}
          labels={labels}
          value={jailData.filter.currently_failed}
          stat={'Banned'}
          color={theme.palette.primary.main}
        />
        <LineStat
          data={data2}
          labels={labels}
          value={jailData.filter.failed}
          stat={'Failed'}
          color={theme.palette.secondary.main}
        />
      </Grid>
    </Root>
  );
};
