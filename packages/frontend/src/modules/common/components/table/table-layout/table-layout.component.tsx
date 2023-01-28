import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  Tabs,
  TextField
} from '@mui/material';

import { useSearchParams } from '../../../../deps';

import { a11yProps } from '../../../utils';
import {
  CustomBoxHeader,
  CustomBoxLayout,
  CustomContainer,
  CustomForm,
  CustomFormControl,
  CustomTab
} from './table-layout.styled';
import { useQuery } from '../../../hooks';
import { debounce } from '../../../helpers';

export const TodosTableLayout = ({ children, setTrigger, count }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { tablet, desktop, mobile } = useQuery();

  const [access, setAccess] = useState<string>(searchParams.get('access') || 'public');
  const [status, setStatus] = useState<string>(searchParams.get('status') || 'all');
  const [query, setQuery] = useState<string>(searchParams.get('query') || '');

  const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(Number(searchParams.get('perPage')) || 10);

  // update search params
  const changeSearchParams = () => {
    searchParams.set('access', access);
    searchParams.set('status', status);
    searchParams.set('query', query);
    searchParams.set('perPage', rowsPerPage.toString());
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
    // it makes react-query refetch data based on filters and pagination
    setTrigger(Date.now());
  };

  // filters handlers
  const handleChangePrivate = (event: React.SyntheticEvent, newValue: string) => {
    setAccess(newValue);
  };

  const handleChangeCompleted = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  const handleChangeQuery = (event: any) => {
    const target = event.target as HTMLButtonElement;
    setQuery(target.value);
  };
  const debouncedHandleChangeQuery = useMemo(() => debounce(handleChangeQuery, 500), []);

  // reset filters
  const resetFilters = () => {
    setAccess('public');
    setStatus('all');
    setQuery('');
  };

  // PAGINATION
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    changeSearchParams();
  }, [access, status, query, rowsPerPage, page]);

  const searchBar = (
    <CustomForm>
      <TextField
        id="search-bar"
        className="text"
        onInput={debouncedHandleChangeQuery}
        label="Find todo"
        variant="outlined"
        placeholder="Search..."
        size="small"
        defaultValue={query}
      />
    </CustomForm>
  );

  return (
    <CustomBoxLayout>
      <CustomBoxHeader>
        {mobile && searchBar}
        <CustomContainer>
          <Tabs value={access} onChange={handleChangePrivate} aria-label="basic tabs example">
            <CustomTab value="public" label="Public" {...a11yProps(2)} />
            <CustomTab value="private" label="Private" {...a11yProps(1)} />
          </Tabs>
          <CustomFormControl variant="standard">
            <Select
              sx={{ p: '0.7rem', fontSize: '14px' }}
              id="completed"
              value={status}
              onChange={handleChangeCompleted}
            >
              <MenuItem value="all">ALL</MenuItem>
              <MenuItem value="completed">COMPLETED</MenuItem>
              <MenuItem value="todo">TO DO</MenuItem>
            </Select>
          </CustomFormControl>
          <Button sx={{ marginLeft: '1rem' }} onClick={resetFilters}>
            Reset
          </Button>
        </CustomContainer>
        {(tablet || desktop) && searchBar}
      </CustomBoxHeader>
      {children}
      <TablePagination
        sx={{ mx: '4rem' }}
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </CustomBoxLayout>
  );
};
