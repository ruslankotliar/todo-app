/* eslint-disable react/jsx-curly-newline */
import React from 'react';

import { Button, LinearProgress, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';

import { CustomBox, CustomContainer } from './user-form.styled';

interface Props {
  handleSubmit: Function;
  register: Boolean;
  login: Boolean;
  updateUser: Boolean;
  validationSchema: any;
  initialValues: {
    email: string;
    password?: string;
    confirmPassword?: string;
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  };
}

export const UserFormComponent = ({
  handleSubmit,
  register,
  login,
  updateUser,
  validationSchema,
  initialValues
}: Props) => {
  const registerForm = (
    <>
      <Field
        component={TextField}
        name="password"
        type="password"
        label="Password"
        fullWidth
        variant="outlined"
        margin="dense"
      />
      <Field
        component={TextField}
        name="confirmPassword"
        type="password"
        label="Confirm password"
        required
        fullWidth
        variant="outlined"
        margin="dense"
      />
    </>
  );

  const loginForm = (
    <Field
      component={TextField}
      name="password"
      type="password"
      label="Password"
      fullWidth
      variant="outlined"
      margin="dense"
    />
  );

  const updateUserForm = (
    <>
      <Field
        component={TextField}
        name="oldPassword"
        type="password"
        label="Old password"
        fullWidth
        variant="outlined"
        margin="dense"
      />
      <Field
        component={TextField}
        name="newPassword"
        type="password"
        label="New password"
        required
        fullWidth
        variant="outlined"
        margin="dense"
      />
      <Field
        component={TextField}
        name="confirmNewPassword"
        type="password"
        label="Confirm new password"
        required
        fullWidth
        variant="outlined"
        margin="dense"
      />
    </>
  );
  return (
    <CustomContainer>
      <Typography variant="h3">
        {register && 'Register'}
        {login && 'Log in'}
        {updateUser && 'Update'}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password, oldPassword, newPassword } = values;
          handleSubmit({ email, password: password || oldPassword, newPassword });
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
              required
              fullWidth
              variant="outlined"
              margin="dense"
            />
            {register && registerForm}
            {login && loginForm}
            {updateUser && updateUserForm}
            {isSubmitting && <LinearProgress />}
            {login && (
              <CustomBox>
                <Typography>Not registered?</Typography>
                <Button variant="outlined" href="/user/register">
                  Register
                </Button>
              </CustomBox>
            )}
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
    </CustomContainer>
  );
};
