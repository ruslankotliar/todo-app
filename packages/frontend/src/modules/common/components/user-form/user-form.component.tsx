/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Alert, Button, LinearProgress, Snackbar, Tab, Tabs, AlertColor } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { SimpleFileUpload, TextField } from 'formik-mui';

import { AxiosError } from 'axios';
import { CustomContainer } from './user-form.styled';

type AxiosResponse = {
  message: string;
};

interface Props {
  handleSubmit: Function;
  register: boolean;
  login: boolean;
  updateUser: boolean;
  validationSchema: any;
  isError: boolean;
  isSuccess: boolean;
  error: AxiosError<AxiosResponse, any> | undefined;
  isLoading: boolean;
  initialValues: {
    email: string;
    password?: string;
    confirmPassword?: string;
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    avatar?: any;
  };
}

interface SnackBar {
  message: string;
  severity: AlertColor;
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
  isLoading,
  isSuccess
}: Props) => {
  const [action, setAction] = useState<string>(register ? 'register' : 'login');
  const [open, setOpen] = useState<boolean | undefined>(isError);
  const [snackBar, setSnackBar] = useState<SnackBar>();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAction(newValue);
  };

  const handleSnackBar = (): void => {
    if (isError) {
      setSnackBar({
        message: error?.response?.data?.message || 'Unknown error',
        severity: 'error'
      });
    } else {
      setSnackBar({
        message: `User successfully ${
          updateUser ? 'updated' : register ? 'registered' : 'logged in '
        }`,
        severity: 'success'
      });
    }
    setOpen(true);
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
      <Field
        name="avatar"
        accept="image/png,image/jpeg,image/gif"
        type="file"
        component={SimpleFileUpload}
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

  useEffect(() => {
    (isSuccess || isError) && handleSnackBar();
  }, [isSuccess, isError]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackBar?.severity} sx={{ width: '100%' }}>
          {snackBar?.message}
        </Alert>
      </Snackbar>
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
            await handleSubmit({
              email,
              password: password || oldPassword,
              newPassword,
              avatar
            });
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
    </>
  );
};
