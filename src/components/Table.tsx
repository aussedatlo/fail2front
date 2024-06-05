import { useMemo, useState } from 'react';
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

type TableProps = {
  labels: string[];
  data: Record<string, string | React.ReactElement>[];
  colsWidth: string[];
  rowsPerPage: number;
};

export const Table: React.FC<TableProps> = ({
  labels,
  data,
  colsWidth,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(0);

  const dataForPage = useMemo(
    () => data.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [data, page, rowsPerPage],
  );

  const onPageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => {
    setPage(page);
  };

  return (
    <>
      <TableContainer component={Box} sx={{ marginTop: 2 }}>
        <MuiTable size="small">
          <TableHead>
            <TableRow>
              {labels.map((key, index) => (
                <TableCell key={index} sx={{ width: colsWidth[index] }}>
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {key}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataForPage.map((row, index) => (
              <TableRow key={index} hover>
                {Object.values(row).map((value, index) => (
                  <TableCell
                    key={index}
                    sx={{ width: colsWidth[index], height: 40 }}
                  >
                    <Box
                      sx={{
                        display: 'block',
                        width: '90%',
                        paddingRight: '1em',
                      }}
                    >
                      <Typography noWrap variant="body2">
                        {value}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {data.length === 0 && (
        <Typography sx={{ margin: 1 }} color="text.secondary">
          No data
        </Typography>
      )}

      <TablePagination
        rowsPerPageOptions={[]}
        component={Box}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
      />
    </>
  );
};
