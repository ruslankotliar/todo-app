/* eslint-disable react/jsx-curly-newline */
import React from 'react';

import { TodosTableLayout } from './table-layout';

import { TodosDesktopComponent } from './table-desktop';
import { TodosTabletComponent } from './table-tablet';
import { TodosMobileComponent } from './table-mobile';

import { useQuery, useTodos } from '../../hooks';
import { SpinnerComponent } from '../spinner';
import { ErrorComponent } from '../error';

export const TodosTableComponent = () => {
  const { tablet, desktop, mobile } = useQuery();

  const {
    isError: isErrorMutate,
    error: errorMutate,
    allTodos,
    setTrigger,
    updateTodoMutation,
    removeTodoMutation
  } = useTodos();
  const { isLoading, isError, error, data: todos } = allTodos;

  if (isLoading) return <SpinnerComponent />;
  if (isError || isErrorMutate) return <ErrorComponent error={error || errorMutate} />;
  return (
    <TodosTableLayout setTrigger={setTrigger} count={todos[0].totalCount}>
      {desktop && (
        <TodosDesktopComponent
          todos={todos}
          updateTodoMutation={updateTodoMutation}
          removeTodoMutation={removeTodoMutation}
        />
      )}
      {tablet && (
        <TodosTabletComponent
          todos={todos}
          updateTodoMutation={updateTodoMutation}
          removeTodoMutation={removeTodoMutation}
        />
      )}
      {mobile && (
        <TodosMobileComponent
          todos={todos}
          updateTodoMutation={updateTodoMutation}
          removeTodoMutation={removeTodoMutation}
        />
      )}
    </TodosTableLayout>
  );
};
