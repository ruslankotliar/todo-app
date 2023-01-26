/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';

import { TodosTableLayout } from './table-layout';

import { TodosDesktopComponent } from './table-desktop';
import { TodosTabletComponent } from './table-tablet';
import { TodosMobileComponent } from './table-mobile';

import { useQuery, useTodos } from '../../hooks';
import { SpinnerComponent } from '../spinner';
import { ErrorComponent } from '../error';
import { SnackBarComponent } from '../error/snackbar/snackbar.component';
import { ISnackBar } from '../../interfaces';

export const TodosTableComponent = () => {
  const [snackBar, setSnackBar] = useState<ISnackBar>({
    message: 'Error',
    severity: 'error',
    open: false
  });

  const { tablet, desktop, mobile } = useQuery();

  const {
    isError: isErrorMutate,
    error: errorMutate,
    isLoading: isLoadingMutate,
    isSuccess: isSuccessMutate,
    allTodos,
    setTrigger,
    updateTodoMutation,
    removeTodoMutation,
    isSuccessUpdate
  } = useTodos();
  const { isLoading, isError, error, data: todos } = allTodos;

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
        message: `Todo successfully ${isSuccessUpdate ? 'updated' : 'removed'}`,
        severity: 'success',
        open: true
      });
    }
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
      <TodosTableLayout setTrigger={setTrigger} count={todos[0]?.totalCount || 0}>
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
    </>
  );
};
