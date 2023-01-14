import React from 'react';

import { Button, Grid, Switch, Typography } from '@mui/material';

import {
  CustomBox,
  CustomGrid,
  CustomPaper,
  CustomTypography,
  CustomTypographyBody
} from './todo-single.styled';

import { useTodos } from '../../hooks';
import { SpinnerComponent } from '../spinner';
import { ErrorComponent } from '../error';

export const SingleTodoComponent = () => {
  const { isError: isErrorMutate, error: errorMutate, singleTodo, updateTodoMutation } = useTodos();

  const { isLoading, isError, error, data: todo } = singleTodo;

  const handleChange = (value: string, newValue: Boolean) => {
    if (!todo) return;
    if (value === 'completed' || value === 'private') todo[value] = newValue;
    updateTodoMutation(
      {
        title: String(todo?.title),
        description: String(todo?.description),
        completed: Boolean(todo?.completed),
        private: Boolean(todo?.private)
      },
      todo?._id
    );
  };

  if (isLoading) return <SpinnerComponent />;
  if (isError || isErrorMutate) return <ErrorComponent error={error || errorMutate} />;
  return (
    <CustomPaper>
      <CustomTypography>{todo?.title}</CustomTypography>
      <Typography variant="h6">Description</Typography>
      <CustomTypographyBody variant="body1">{todo?.description}</CustomTypographyBody>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography>Completed</Typography>
        </Grid>
        <CustomGrid item xs={6}>
          <Switch
            onChange={(e) => handleChange('completed', e.target.checked)}
            checked={Boolean(todo?.completed)}
          />
        </CustomGrid>
        <Grid item xs={6}>
          <Typography>Private</Typography>
        </Grid>
        <CustomGrid item xs={6}>
          <Switch
            onChange={(e) => handleChange('private', e.target.checked)}
            checked={Boolean(todo?.private)}
          />
        </CustomGrid>
      </Grid>
      <CustomBox>
        <Button href="/todos">Back</Button>
        <Button variant="contained" href={`/todo/update-todo/${todo?._id}`}>
          Edit
        </Button>
      </CustomBox>
    </CustomPaper>
  );
};
