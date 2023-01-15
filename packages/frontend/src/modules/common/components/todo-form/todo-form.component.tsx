/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';

import { useTodos } from '../../hooks';
import { todoSchema } from '../../schemas/todo.schema';
import { SpinnerComponent } from '../spinner';
import { ErrorComponent } from '../error';

export const TodoFormComponent = () => {
  const {
    isError: isErrorMutate,
    error: errorMutate,
    singleTodo,
    updateTodoMutation,
    createTodoMutation
  } = useTodos();
  const { isLoading, isError, error, data: todo } = singleTodo;

  if (isLoading) return <SpinnerComponent />;
  if (isError || isErrorMutate) return <ErrorComponent error={error || errorMutate} />;
  return (
    <Box>
      <Typography variant="h3">{todo ? 'Update todo' : 'Create todo'}</Typography>
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
          <Form>
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
            {isSubmitting && <LinearProgress />}
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
