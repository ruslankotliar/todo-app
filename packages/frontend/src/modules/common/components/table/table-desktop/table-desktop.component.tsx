import React from 'react';
import { Switch, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

import {
  CustomDeleteButton,
  CustomEditButton,
  CustomPaper,
  CustomTableCell,
  CustomTableHeaderCell,
  CustomViewButton
} from '../table-todos.styled';

export const TodosDesktopComponent = ({
  todos = [],
  updateTodoMutation,
  removeTodoMutation
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
          {todos &&
            todos.map((row: any) => {
              const { title, description, completed, private: privateStatus, _id: id } = row;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <CustomTableCell align="left">{title}</CustomTableCell>
                  <CustomTableCell align="left">{description}</CustomTableCell>
                  <CustomTableCell align="center">
                    <CustomViewButton variant="contained" href={`/todo/single-todo/${id}`}>
                      View
                    </CustomViewButton>
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    <CustomEditButton href={`/todo/update-todo/${id}`}>Edit</CustomEditButton>
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    <CustomDeleteButton onClick={() => removeTodoMutation(id)}>
                      Delete
                    </CustomDeleteButton>
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    <Switch
                      onChange={(e) => {
                        updateTodoMutation(
                          {
                            title,
                            description,
                            private: privateStatus,
                            completed: e.target.checked
                          },
                          id
                        );
                      }}
                      defaultChecked={completed}
                    />
                  </CustomTableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </CustomPaper>
);
