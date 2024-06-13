import { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Input,
  InputAdornment,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { getValuesFromComplexObject } from '@/utils/object';

type TableProps<TData, TFormattedData> = {
  labels: string[];
  data: TData[];
  rowsPerPage: number;
  colsWidth?: string[];
  filterKeys?: string[];
  onClick?: (item: TData) => void;
  formatter?: (item: TData) => TFormattedData;
};

export const Table = <TData extends object, TFormattedData extends object>({
  labels,
  data,
  colsWidth,
  rowsPerPage,
  filterKeys,
  onClick,
  formatter,
}: TableProps<TData, TFormattedData>) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const dataFiltered = useMemo(
    () =>
      data.filter((item) => {
        const values = getValuesFromComplexObject(item, filterKeys);
        return values.some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase()),
        );
      }),
    [data, filterKeys, search],
  );

  const dataForPage = useMemo(
    () => dataFiltered.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [dataFiltered, page, rowsPerPage],
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

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          // FIXME: not the best css here
          marginTop: '-25px',
          marginBottom: '-10px',
        }}
      >
        <Box flex={1} />
        <Input
          placeholder="Search"
          onChange={onSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
      <TableContainer component={Box} sx={{ marginTop: 2, overflow: 'hidden' }}>
        <MuiTable size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {labels.map((key, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: colsWidth?.[index] ?? 'auto',
                    borderColor: 'divider',
                  }}
                >
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
                sx={{
                  cursor: onClick ? 'pointer' : 'default',
                }}
              >
                {Object.values(row).map((value, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      height: 40,
                      width: colsWidth?.[index] ?? 'auto',
                      borderColor: 'divider',
                    }}
                  >
                    {value}
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
        count={dataFiltered.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
      />
    </>
  );
};
