/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, LinearProgress, Tab, Tabs } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { SimpleFileUpload, SimpleFileUploadProps, TextField } from 'formik-mui';

import { AxiosError } from 'axios';
import { CustomContainer } from './user-form.styled';
import { ErrorComponent } from '../error';

interface Props {
  handleSubmit: Function;
  register: Boolean;
  login: Boolean;
  updateUser: Boolean;
  validationSchema: any;
  isError: Boolean;
  error: AxiosError<unknown, any> | undefined;
  isLoading: Boolean;
  initialValues: {
    email: string;
    password?: string;
    confirmPassword?: string;
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    avatar?: SimpleFileUploadProps;
  };
}

export const UserFormComponent = ({
  handleSubmit,
  register,
  login,
  updateUser,
  validationSchema,
  initialValues,
  isError,
  error,
  isLoading
}: Props) => {
  const [action, setAction] = useState<string>(register ? 'register' : 'login');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAction(newValue);
  };

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
      <Field name="avatar" type="file" component={SimpleFileUpload} />
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

  if (isError) return <ErrorComponent error={error} />;
  return (
    <CustomContainer>
      <Tabs
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        value={action}
        onChange={handleChange}
        aria-label="user-form-tabs"
      >
        {!updateUser && (
          <Tab label="Register" value="register" to="/user/register" component={Link} />
        )}
        {!updateUser && <Tab label="Log in" value="login" to="/user/login" component={Link} />}
        {updateUser && <Tab label="Update profile" value="update" />}
      </Tabs>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password, oldPassword, newPassword, avatar } = values;
          await handleSubmit({ email, password: password || oldPassword, newPassword, avatar });
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
            {login && loginForm}
            {updateUser && updateUserForm}
            {register && registerForm}
            {(isSubmitting || isLoading) && <LinearProgress />}
            <Button
              sx={{ display: 'block', marginTop: '0.5rem' }}
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
