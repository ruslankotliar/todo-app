import React from 'react';
import {
  Switch,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import {
  CustomDeleteButton,
  CustomEditButton,
  CustomPaper,
  CustomTableCell,
  CustomTableHeaderCell,
  CustomViewButton
} from '../table-todos.styled';

import { columns } from '../../../consts/app-keys.const';

export const TodosDesktopComponent = ({
  todos,
  page,
  rowsPerPage,
  updateTodoCompleteStatus,
  handleChangePage,
  handleChangeRowsPerPage,
  removeTodoFromDB
}: any) => (
  <CustomPaper>
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <CustomTableHeaderCell align="left" colSpan={1}>
              Todo Title
            </CustomTableHeaderCell>
            <CustomTableHeaderCell align="left" colSpan={1}>
              Description
            </CustomTableHeaderCell>
            <CustomTableHeaderCell align="center" colSpan={3}>
              Actions
            </CustomTableHeaderCell>
            <CustomTableHeaderCell align="center" colSpan={1}>
              Completed
            </CustomTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.length &&
            todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  const cell: any =
                    column.label === 'View' ? (
                      <CustomViewButton variant="contained" href={`/todo/${value}`}>
                        {column.label}
                      </CustomViewButton>
                    ) : column.label === 'Delete' ? (
                      <CustomDeleteButton onClick={() => removeTodoFromDB(value)}>
                        {column.label}
                      </CustomDeleteButton>
                    ) : column.label === 'Edit' ? (
                      <CustomEditButton href={`/todo/update-todo/${value}`}>
                        {column.label}
                      </CustomEditButton>
                    ) : column.label === 'Completed' ? (
                      <Switch
                        onChange={(e) => {
                          updateTodoCompleteStatus(
                            {
                              title: row.title,
                              description: row.description,
                              private: row.private,
                              completed: e.target.checked
                            },
                            row._id
                          );
                        }}
                        defaultChecked={value}
                      />
                    ) : (
                      value
                    );
                  // if (column.label === 'View') {
                  //   cell = (
                  //     <CustomViewButton variant="contained" href={`/todo/${value}`}>
                  //       {column.label}
                  //     </CustomViewButton>
                  //   );
                  // } else if (column.label === 'Delete') {
                  //   cell = (
                  //     <CustomDeleteButton onClick={() => removeTodoFromDB(value)}>
                  //       {column.label}
                  //     </CustomDeleteButton>
                  //   );
                  // } else if (column.label === 'Edit') {
                  //   cell = (
                  //     <CustomEditButton href={`/todo/update-todo/${value}`}>
                  //       {column.label}
                  //     </CustomEditButton>
                  //   );
                  // } else if (column.label === 'Completed') {
                  //   cell = (
                  //     <Switch
                  //       onChange={(e) => {
                  //         updateTodoCompleteStatus(
                  //           {
                  //             title: row.title,
                  //             description: row.description,
                  //             private: row.private,
                  //             completed: e.target.checked
                  //           },
                  //           row._id
                  //         );
                  //       }}
                  //       defaultChecked={value}
                  //     />
                  //   );
                  // }
                  return (
                    <CustomTableCell key={`${column.id}-${column.label}`} align={column.align}>
                      {cell}
                    </CustomTableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={todos.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </CustomPaper>
);
