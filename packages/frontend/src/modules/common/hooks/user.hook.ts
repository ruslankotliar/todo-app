/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-confusing-arrow */
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import { AxiosError } from 'axios';
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

import { storage } from '../../../configs/firebase';

export function useUser() {
  const [error, setError] = useState<AxiosError<unknown, any> | undefined>();
  const [isError, setIsError] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [, setStorageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined,
    avatar: undefined
  });
  const [, setStorageToken] = useLocalStorage<string | undefined>('todo-app-token', undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<IUser | undefined>(undefined);
  const params = useParams<Params>();

  async function handleUpload(file: any) {
    if (!file) {
      alert('Please choose a file first!');
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      () => {
        setIsLoading(true);
        console.log('loading avatar...');
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setAvatar(url);
          console.log(url);
        });
      }
    );
  }

  const register = useMutation<ICreateUser, AxiosError<unknown, any> | undefined, IUser>(
    registerUser,
    {
      onSuccess: ({ user }: ICreateUser) => {
        queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
      }
    }
  );

  const login = useMutation<ICreateUser, AxiosError<unknown, any> | undefined, IUser>(loginUser, {
    onSuccess: ({ user }: ICreateUser) => {
      queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
    }
  });

  const update = useMutation<
    ICreateUser,
    AxiosError<unknown, any> | undefined,
    IUpdateUserMutation
  >(updateUser, {
    onSuccess: ({ user }: ICreateUser) => {
      queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
    }
  });

  const {
    mutate: mutateRegister,
    isLoading: isLoadingRegister,
    isSuccess: isSuccessRegister,
    isError: isErrorRegister,
    error: errorRegister,
    data: registerData
  } = register;
  const {
    mutate: mutateLogin,
    isLoading: isLoadingLogin,
    isSuccess: isSuccessLogin,
    isError: isErrorLogin,
    error: errorLogin,
    data: loginData
  } = login;
  const {
    mutate: mutateUpdate,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    data: updateData
  } = update;

  const registerUserMutation = async (user: IUser) => {
    setUserData({ email: user.email, password: user.password });
    handleUpload(user.avatar);
  };

  const loginUserMutation = (user: IUser) => {
    mutateLogin(user);
  };

  const updateUserMutation = (user: IFormUpdateUser, id: string | undefined = params.userID) => {
    if (!id) return;
    mutateUpdate({ user, id });
  };

  useEffect(() => {
    avatar &&
      userData &&
      mutateRegister({ email: userData.email, password: userData.password, avatar });
  }, [avatar]);

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

  useEffect(() => {
    setIsError(isErrorRegister || isErrorLogin || isErrorUpdate);
    setError(errorRegister || errorLogin || errorUpdate || undefined);
  }, [isErrorRegister, isErrorLogin, isErrorUpdate]);

  useEffect(() => {
    setIsLoading(isLoadingLogin || isLoadingRegister || isLoadingUpdate);
  }, [isLoadingLogin, isLoadingRegister, isLoadingUpdate]);

  return {
    registerUserMutation,
    loginUserMutation,
    updateUserMutation,
    error,
    isError,
    isLoading
  };
}
