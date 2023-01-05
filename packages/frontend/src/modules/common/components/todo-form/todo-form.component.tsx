/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { Box, Button, LinearProgress } from '@mui/material';

import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';

import { FormValues } from '../../interfaces';

export const TodoFormComponent = ({ initialValues, handleSubmit }: any) => (
  <Formik
    initialValues={initialValues}
    validate={(values) => {
      const errors: Partial<FormValues> = {};
      if (!values.title) {
        errors.title = 'Required';
      } else if (values.title.length > 20) {
        errors.title = 'Title is to long';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      handleSubmit(values);
      setSubmitting(false);
      resetForm();
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
        <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);
