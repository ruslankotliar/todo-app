import React from 'react';
import json2mq from 'json2mq';

import { Box, IconButton, Tabs, TextField, useMediaQuery } from '@mui/material';
import { Search } from '@material-ui/icons';

import { a11yProps } from '../../../utils';
import { CustomBoxHeader, CustomBoxLayout, CustomTab } from './table-layout.styled';

interface PropsValue {
  setSearchQuery: Function;
  setFilterTodos: Function;
  filterTodos: string;
  children: any;
}

export const TodosTableLayout = ({
  children,
  filterTodos,
  setSearchQuery,
  setFilterTodos
}: PropsValue) => {
  // MEDIA QUERIES
  const mobile = useMediaQuery(
    json2mq({
      maxWidth: 424
    })
  );
  const tablet = useMediaQuery(
    json2mq({
      minWidth: 425,
      maxWidth: 767
    })
  );
  const desktop = useMediaQuery(
    json2mq({
      minWidth: 768
    })
  );
  // PAGINATION VALUES
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterTodos(newValue);
  };

  const searchBar = (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(event) => {
          const target = event.target as HTMLButtonElement;
          setSearchQuery(target.value);
        }}
        label="Enter a todo title"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      {desktop ||
        (mobile && (
          <IconButton type="submit" aria-label="search">
            <Search />
          </IconButton>
        ))}
    </form>
  );

  return (
    <CustomBoxLayout>
      <CustomBoxHeader>
        {mobile && searchBar}
        <Box>
          <Tabs value={filterTodos} onChange={handleChange} aria-label="basic tabs example">
            <CustomTab value="all" label="All" {...a11yProps(0)} />
            <CustomTab value="private" label="Private" {...a11yProps(1)} />
            <CustomTab value="public" label="Public" {...a11yProps(2)} />
            <CustomTab value="completed" label="Completed" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {tablet && searchBar}
      </CustomBoxHeader>
      {children}
    </CustomBoxLayout>
  );
};
