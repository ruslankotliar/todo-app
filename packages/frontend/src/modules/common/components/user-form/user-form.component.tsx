/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, LinearProgress, Tab, Tabs } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { SimpleFileUpload, TextField } from 'formik-mui';

import { AxiosError } from 'axios';
import { CustomContainer } from './user-form.styled';
import { SnackBarComponent } from '../error/snackbar/snackbar.component';
import { IAxiosResponse, ISnackBar } from '../../interfaces';

interface Props {
  handleSubmit: Function;
  register: boolean;
  login: boolean;
  updateUser: boolean;
  validationSchema: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: AxiosError<IAxiosResponse, any> | undefined;
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
  const [action, setAction] = useState<string>(register ? 'register' : login ? 'login' : 'update');
  const [snackBar, setSnackBar] = useState<ISnackBar>({
    message: 'Error',
    severity: 'error',
    open: false
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setAction(newValue);
  };

  const handleSnackBar = (): void => {
    if (isError) {
      setSnackBar({
        message: error?.response?.data?.message || 'Unknown error',
        severity: 'error',
        open: true
      });
    } else {
      setSnackBar({
        message: `User successfully ${
          updateUser ? 'updated' : register ? 'registered' : 'logged in'
        }`,
        severity: 'success',
        open: true
      });
    }
  };

  useEffect(() => {
    (isSuccess || isError) && handleSnackBar();
  }, [isSuccess, isError]);

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
      <Field
        sx={{ padding: '5rem' }}
        name="avatar"
        accept="image/png,image/jpeg,image/gif"
        type="file"
        component={SimpleFileUpload}
      />
    </>
  );

  const form = (
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
  );

  return (
    <>
      <SnackBarComponent snackBar={snackBar} />
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
        {form}
      </CustomContainer>
    </>
  );
};
