/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';

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
import { ISnackBar } from '../../interfaces';
import { SnackBarComponent } from '../error/snackbar/snackbar.component';

import { ErrorComponent } from '../error';

export const SingleTodoComponent = () => {
  const [snackBar, setSnackBar] = useState<ISnackBar>({
    message: 'Error',
    severity: 'error',
    open: false
  });
  const {
    isError: isErrorMutate,
    isSuccess: isSuccessMutate,
    isLoading: isLoadingMutate,
    error: errorMutate,
    singleTodo,
    updateTodoMutation
  } = useTodos();

  const { isError, isLoading, error, data: todo } = singleTodo;

  const handleSnackBar = (): void => {
    if (isErrorMutate) {
      setSnackBar({
        message: errorMutate?.response?.data?.message || 'Unknown error',
        severity: 'error',
        open: true
      });
    }
    if (isSuccessMutate) {
      setSnackBar({
        message: 'Todo successfully updated',
        severity: 'success',
        open: true
      });
    }
  };

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

  useEffect(() => {
    (isSuccessMutate || isErrorMutate) && handleSnackBar();
  }, [isSuccessMutate, isErrorMutate]);

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading || isLoadingMutate) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <SnackBarComponent snackBar={snackBar} />
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
    </>
  );
};
