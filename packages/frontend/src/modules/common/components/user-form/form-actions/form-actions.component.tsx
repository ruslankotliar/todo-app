import React from 'react';

import { loginSchema, registerSchema, updateUserSchema } from '../../../schemas/user.schema';
import { UserFormComponent } from '../index';
import { useUser } from '../../../hooks/user.hook';
import { useLocalStorage } from '../../../hooks/local-storage.hook';
import { IStorageUser } from '../../../interfaces';

const RegisterUserComponent = () => {
  const { registerUserMutation, isError, error, isLoading, isSuccess } = useUser();

  return (
    <UserFormComponent
      handleSubmit={registerUserMutation}
      register
      login={false}
      updateUser={false}
      validationSchema={registerSchema}
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      isError={isError}
      error={error}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};

const LoginUserComponent = () => {
  const { loginUserMutation, isError, error, isLoading, isSuccess } = useUser();
  return (
    <UserFormComponent
      handleSubmit={loginUserMutation}
      register={false}
      login
      updateUser={false}
      validationSchema={loginSchema}
      initialValues={{ email: '', password: '' }}
      isError={isError}
      error={error}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};

const UpdateUserComponent = () => {
  const [storageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined,
    avatar: undefined
  });
  const { updateUserMutation, isError, error, isLoading, isSuccess } = useUser();
  return (
    <UserFormComponent
      handleSubmit={updateUserMutation}
      register={false}
      login={false}
      updateUser
      validationSchema={updateUserSchema}
      initialValues={{
        email: storageUser.email || '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }}
      isError={isError}
      error={error}
      isLoading={isLoading}
      isSuccess={isSuccess}
    />
  );
};

export { RegisterUserComponent, LoginUserComponent, UpdateUserComponent };
