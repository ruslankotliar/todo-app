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
          {todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
            const { title, description, completed, private: privateStatus, _id: id } = row;
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                <CustomTableCell align="left">{title}</CustomTableCell>
                <CustomTableCell align="left">{description}</CustomTableCell>
                <CustomViewButton variant="contained" href={`/todo/${id}`}>
                  View
                </CustomViewButton>
                <CustomEditButton href={`/todo/update-todo/${id}`}>Edit</CustomEditButton>
                <CustomDeleteButton onClick={() => removeTodoFromDB(id)}>Delete</CustomDeleteButton>
                <Switch
                  onChange={(e) => {
                    updateTodoCompleteStatus(
                      {
                        title,
                        description,
                        privateStatus,
                        completed: e.target.checked
                      },
                      id
                    );
                  }}
                  defaultChecked={completed}
                />
              </TableRow>
            );
          })}
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
