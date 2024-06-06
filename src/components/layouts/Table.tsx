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

type TableProps<TData, TFormattedData> = {
  labels: string[];
  data: TData[];
  colsWidth: string[];
  rowsPerPage: number;
  onClick?: (item: TData) => void;
  formatter?: (item: TData) => TFormattedData;
};

export const Table = <TData extends object, TFormattedData extends object>({
  labels,
  data,
  colsWidth,
  rowsPerPage,
  onClick,
  formatter,
}: TableProps<TData, TFormattedData>) => {
  const [page, setPage] = useState(0);

  const dataForPage = useMemo(
    () => data.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [data, page, rowsPerPage],
  );

  const formattedDataForPage = useMemo(
    () =>
      (formatter && dataForPage.map((item) => formatter(item))) ?? dataForPage,
    [dataForPage, formatter],
  );

  const onPageChange = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage);
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
            {formattedDataForPage.map((row, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => onClick && onClick(dataForPage[index])}
                sx={{ cursor: onClick ? 'pointer' : 'default' }}
              >
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
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {value}
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
