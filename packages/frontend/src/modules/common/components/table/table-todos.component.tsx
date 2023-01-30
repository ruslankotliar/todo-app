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
    action
  } = useTodos();
  const { isLoading, isError, error, data } = allTodos;

  const handleSnackBar = (): void => {
    if (isErrorMutate) {
      setSnackBar({
        message: errorMutate?.response?.data?.message || 'Unknown error',
        severity: 'error',
        open: true
      });
    } else {
      setSnackBar({
        message: `Todo ${action}`,
        severity: 'success',
        open: true
      });
    }
  };

  useEffect(() => {
    (isSuccessMutate || isErrorMutate) && handleSnackBar();
  }, [isSuccessMutate, isErrorMutate]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isError ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          {(isLoading || isLoadingMutate) && <SpinnerComponent />}
          <SnackBarComponent snackBar={snackBar} />
          <TodosTableLayout
            setTrigger={setTrigger}
            count={data && data[0].metadata[0] ? data[0].metadata[0].total : 0}
          >
            {desktop && (
              <TodosDesktopComponent
                todos={data ? data[0].data : []}
                updateTodoMutation={updateTodoMutation}
                removeTodoMutation={removeTodoMutation}
              />
            )}
            {tablet && (
              <TodosTabletComponent
                todos={data ? data[0].data : []}
                updateTodoMutation={updateTodoMutation}
                removeTodoMutation={removeTodoMutation}
              />
            )}
            {mobile && (
              <TodosMobileComponent
                todos={data ? data[0].data : []}
                updateTodoMutation={updateTodoMutation}
                removeTodoMutation={removeTodoMutation}
              />
            )}
          </TodosTableLayout>
        </>
      )}
    </>
  );
};
