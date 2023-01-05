/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

import { Params } from '../../types';

import { todoService } from '../../api/services';
import { REACT_QUERY_KEYS } from '../../consts/app-keys.const';

import { TodoFormComponent } from '../todo-form';
import { ITodo, IUpdateTodo, IUpdateTodoMutation } from '../../interfaces';

export const UpdateTodoComponent = () => {
  const history = useHistory();
  const params: Params = useParams();
  const { isLoading, isError, error, data } = useQuery<ITodo, Error>(
    REACT_QUERY_KEYS.todo,
    async () => (await todoService.getSingleTodo(params.id)).data
  );
  const {
    mutate,
    status: mutateStatus,
    error: mutateError
  } = useMutation<ITodo, Error, IUpdateTodoMutation>(async (body: IUpdateTodoMutation) =>
    todoService.updateTodo(body)
  );

  const handleSubmit = (todo: IUpdateTodo) => {
    mutate({ todo, id: params.id });
  };

  useEffect(() => {
    if (mutateStatus === 'success') history.push('/');
  }, [mutateStatus, mutateError]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>Error! {error.message}</div>;
  return (
    <TodoFormComponent
      initialValues={{
        title: data?.title,
        description: data?.description,
        private: data?.private
      }}
      handleSubmit={handleSubmit}
      mutateStatus={mutateStatus}
      mutateError={mutateError}
    />
  );
};
