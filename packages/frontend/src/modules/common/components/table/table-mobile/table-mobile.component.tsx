import React from 'react';
import { Container, Divider, Switch, Typography } from '@mui/material';
import { ITodo } from '../../../interfaces';
import {
  CustomBox,
  CustomBoxMobile,
  CustomDeleteButton,
  CustomTypography,
  CustomViewButton
} from '../table-todos.styled';

export const TodosMobileComponent = ({
  todos,
  updateTodoCompleteStatus,
  removeTodoFromDB
}: any) => (
  <Container>
    {todos.map((todo: ITodo) => (
      <CustomBoxMobile key={todo._id}>
        <Typography variant="h4">{todo?.title}</Typography>
        <CustomTypography variant="body1">{todo?.description}</CustomTypography>
        <CustomBox>
          <CustomViewButton variant="contained" href={`/todo/${todo._id}`}>
            View
          </CustomViewButton>
          <CustomDeleteButton onClick={() => removeTodoFromDB(todo._id)}>Delete</CustomDeleteButton>
          <Switch
            onChange={(e) => {
              updateTodoCompleteStatus(
                {
                  title: todo.title,
                  description: todo.description,
                  private: todo.private,
                  completed: e.target.checked
                },
                todo._id
              );
            }}
            defaultChecked={Boolean(todo.completed)}
          />
        </CustomBox>
        <Divider />
      </CustomBoxMobile>
    ))}
  </Container>
);
