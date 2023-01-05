/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { ICreateTodo, ITodo } from '../../interfaces';

import { TodoFormComponent } from '../todo-form';

import { todoService } from '../../api/services';

export const CreateTodoComponent = () => {
  const history = useHistory();
  const {
    mutate,
    status: mutateStatus,
    error: mutateError
  } = useMutation<ITodo, Error, ICreateTodo>(async (body: ICreateTodo) =>
    todoService.createTodo(body)
  );

  const handleSubmit = (todo: ICreateTodo) => {
    mutate(todo);
  };

  useEffect(() => {
    if (mutateStatus === 'success') history.push('/');
    if (mutateError) console.error(mutateError);
  }, [mutateStatus, mutateError]);

  return (
    <TodoFormComponent
      initialValues={{
        title: '',
        description: '',
        private: false
      }}
      handleSubmit={handleSubmit}
      mutateStatus={mutateStatus}
      mutateError={mutateError}
    />
  );
};
