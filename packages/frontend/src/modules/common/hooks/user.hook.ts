/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-confusing-arrow */
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { queryClient } from '../utils/query-client.util';

import { REACT_QUERY_KEYS } from '../consts/app-keys.const';

import {
  ICreateUser,
  IFormUpdateUser,
  IUpdateUserMutation,
  IUser,
  IStorageUser
} from '../interfaces';
import { Params } from '../types';

import { loginUser, registerUser, updateUser } from '../api/user';
import { useLocalStorage } from './local-storage.hook';

export function useUser() {
  const [, setStorageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined
  });
  const [, setStorageToken] = useLocalStorage<string | undefined>('todo-app-token', undefined);
  const params = useParams<Params>();

  const register = useMutation<ICreateUser, Error, IUser>(registerUser, {
    onSuccess: ({ user }: ICreateUser) => {
      queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
    }
  });

  const login = useMutation<ICreateUser, Error, IUser>(loginUser, {
    onSuccess: ({ user }: ICreateUser) => {
      queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
    }
  });

  const update = useMutation<ICreateUser, Error, IUpdateUserMutation>(updateUser, {
    onSuccess: ({ user }: ICreateUser) => {
      queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
    }
  });

  const { mutate: mutateRegister, isSuccess: isSuccessRegister, data: registerData } = register;
  const { mutate: mutateLogin, isSuccess: isSuccessLogin, data: loginData } = login;
  const { mutate: mutateUpdate, isSuccess: isSuccessUpdate, data: updateData } = update;

  const registerUserMutation = (user: IUser) => {
    mutateRegister(user);
  };

  const loginUserMutation = (user: IUser) => {
    mutateLogin(user);
  };

  const updateUserMutation = (user: IFormUpdateUser, id: string | undefined = params.userID) => {
    if (!id) return;
    mutateUpdate({ user, id });
  };

  useEffect(() => {
    if (isSuccessUpdate || isSuccessRegister || isSuccessLogin) {
      const data = registerData || loginData || updateData;
      if (!data) return;
      const { token, user } = data;
      window.location.href = '/';
      setStorageUser(user);
      setStorageToken(token);
    }
  }, [isSuccessUpdate, isSuccessRegister, isSuccessLogin]);

  return {
    registerUserMutation,
    loginUserMutation,
    updateUserMutation
  };
}
