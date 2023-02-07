/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { Formik, Form, Field, CheckboxWithLabel, TextField } from '../../../deps';

import { useTodos } from '../../hooks';
import { todoSchema } from '../../schemas/todo.schema';
import { SpinnerComponent } from '../spinner';
import { SnackBarComponent } from '../error/snackbar/snackbar.component';
import { ISnackBar } from '../../interfaces';
import { ErrorComponent } from '../error';

export const TodoFormComponent = () => {
  const [snackBar, setSnackBar] = useState<ISnackBar>({
    message: 'Error',
    severity: 'error',
    open: false
  });
  const {
    isSuccess: isSuccessMutate,
    isError: isErrorMutate,
    isLoading: isLoadingMutate,
    error: errorMutate,
    singleTodo,
    updateTodoMutation,
    createTodoMutation,
    action
  } = useTodos();
  const { isLoading, isError, error, data: todo } = singleTodo;

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
        message: `Todo successfully ${action}`,
        severity: 'success',
        open: true
      });
    }
  };

  useEffect(() => {
    (isSuccessMutate || isErrorMutate) && handleSnackBar();
  }, [isSuccessMutate, isErrorMutate]);

  const form = (
    <Formik
      initialValues={{
        title: todo?.title || '',
        description: todo?.description || '',
        private: todo?.private || false
      }}
      validationSchema={todoSchema}
      onSubmit={(values, { setSubmitting }) => {
        todo ? updateTodoMutation(values) : createTodoMutation(values);
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.code === 'NumpadEnter') {
              e.preventDefault();
              submitForm();
            }
          }}
        >
          <Field
            component={TextField}
            name="title"
            type="text"
            label="Title"
            required
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <Field
            component={TextField}
            name="description"
            type="text"
            label="Description"
            fullWidth
            variant="outlined"
            margin="dense"
          />
          <Box display="flex">
            <h5>Private:</h5>
            <Field component={CheckboxWithLabel} name="private" type="checkbox" label="Private" />
          </Box>
          {(isSubmitting || isLoadingMutate) && <LinearProgress />}
          <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isError ? (
        <ErrorComponent error={error} />
      ) : isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          <SnackBarComponent snackBar={snackBar} />
          <Box>
            <Typography variant="h3">{todo ? 'Update todo' : 'Create todo'}</Typography>
            {form}
          </Box>
        </>
      )}
    </>
  );
};
