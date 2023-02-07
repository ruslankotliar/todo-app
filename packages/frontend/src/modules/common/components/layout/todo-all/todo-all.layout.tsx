import React, { useEffect } from 'react';

import { MenuItem, Select, TablePagination, Tabs, TextField } from '@mui/material';

import { a11yProps } from '../../../utils';
import {
  CustomBoxHeader,
  CustomBoxLayout,
  CustomButton,
  CustomContainer,
  CustomForm,
  CustomFormControl,
  CustomTab
} from './todo-all.layout.styled';
import { useQuery } from '../../../hooks';
import { useSetSearchParams } from '../../../hooks/params.hook';

export const TodosTableLayout = ({ children, setTrigger, total }: any) => {
  const { tablet, desktop, mobile } = useQuery();
  const { params, trigger, setParam, resetParams } = useSetSearchParams();

  useEffect(() => {
    setTrigger(trigger);
  }, [trigger]);

  const searchBar = (
    <CustomForm>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          const { value } = e.target as HTMLButtonElement;
          setParam('query', value);
        }}
        label="Find todo"
        variant="outlined"
        placeholder="Search..."
        size="small"
        defaultValue={params.query}
      />
    </CustomForm>
  );

  return (
    <CustomBoxLayout>
      <CustomBoxHeader>
        {(mobile || tablet) && searchBar}
        <CustomContainer>
          <Tabs
            value={params.access}
            onChange={(e, value) => setParam('access', value)}
            aria-label="basic tabs example"
          >
            <CustomTab value="public" label="Public" {...a11yProps(2)} />
            <CustomTab value="private" label="Private" {...a11yProps(1)} />
          </Tabs>
          <CustomFormControl variant="standard">
            <Select
              sx={{ p: '0.7rem', fontSize: '14px' }}
              id="completed"
              value={params.status}
              onChange={(e) => setParam('status', e.target.value)}
            >
              <MenuItem value="all">ALL</MenuItem>
              <MenuItem value="completed">COMPLETED</MenuItem>
              <MenuItem value="todo">TO DO</MenuItem>
            </Select>
          </CustomFormControl>
          <CustomButton onClick={resetParams}>Reset</CustomButton>
        </CustomContainer>
        {desktop && searchBar}
      </CustomBoxHeader>
      {children}
      <TablePagination
        sx={{ mx: '4rem' }}
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={params.perPage}
        page={params.page}
        onPageChange={(e, value) => setParam('page', value)}
        onRowsPerPageChange={(e) => {
          setParam('perPage', +e.target.value);
          setParam('page', 0);
        }}
      />
    </CustomBoxLayout>
  );
};
