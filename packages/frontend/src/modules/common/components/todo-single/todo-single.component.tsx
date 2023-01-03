import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { Button, Grid, Switch, Typography } from '@mui/material';

import { ITodo, IUpdateTodo, IUpdateTodoMutation } from '../../interfaces';

import { Params } from '../../types';
import { getSingleTodo, updateTodo } from '../../api';
import {
  CustomBox,
  CustomGrid,
  CustomPaper,
  CustomTypography,
  CustomTypographyBody
} from './todo-single.styled';

export const SingleTodoComponent = () => {
  const params: Params = useParams();

  const { isLoading, isError, error, data } = useQuery<ITodo, Error>('todo', () =>
    getSingleTodo(params.id)
  );
  const { mutate: mutateUpdate } = useMutation<ITodo, Error, IUpdateTodoMutation>(updateTodo);

  // UPDATE TODO
  const updateTodoCompleteStatus = (todo: IUpdateTodo, id: string): void => {
    mutateUpdate({ todo, id });
  };

  const handleChange = (value: string, newValue: Boolean) => {
    if (!data) return;
    if (value === 'completed' || value === 'private') data[value] = newValue;
    updateTodoCompleteStatus(
      {
        title: String(data?.title),
        description: String(data?.description),
        completed: Boolean(data?.completed),
        private: Boolean(data?.private)
      },
      data?._id
    );
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>Error! {error?.message}</div>;
  return (
    <CustomPaper>
      <CustomTypography>{data?.title}</CustomTypography>
      <Typography variant="h6">Description</Typography>
      <CustomTypographyBody variant="body1">{data?.description}</CustomTypographyBody>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography>Completed</Typography>
        </Grid>
        <CustomGrid item xs={6}>
          <Switch
            onChange={(e) => handleChange('completed', e.target.checked)}
            checked={Boolean(data?.completed)}
          />
        </CustomGrid>
        <Grid item xs={6}>
          <Typography>Private</Typography>
        </Grid>
        <CustomGrid item xs={6}>
          <Switch
            onChange={(e) => handleChange('private', e.target.checked)}
            checked={Boolean(data?.private)}
          />
        </CustomGrid>
      </Grid>
      <CustomBox>
        <Button href="/">Back</Button>
        <Button variant="contained" href={`/todo/update-todo/${data?._id}`}>
          Edit
        </Button>
      </CustomBox>
    </CustomPaper>
  );
};
