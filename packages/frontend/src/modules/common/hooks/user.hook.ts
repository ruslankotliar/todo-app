/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-confusing-arrow */
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

type AxiosResponse = {
  message: string;
};

export function useUser() {
  const [error, setError] = useState<AxiosError<AxiosResponse, any> | undefined>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [, setStorageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined,
    avatar: undefined
  });
  const [, setStorageToken] = useLocalStorage<string | undefined>('todo-app-token', undefined);
  // const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  // const [userData, setUserData] = useState<IUser | undefined>(undefined);
  const params = useParams<Params>();

  // async function handleUpload(file: any, id: string) {
  //   if (!file) {
  //     import('jdenticon').then(({ toSvg }) => {
  //       const svgString = toSvg(id, 100);
  //       const base64 = window.btoa(svgString);
  //       file = `data:image/svg+xml;base64,${base64}`;
  //     });
  //   }
  //   const storageRef = ref(storage, `/files/${file?.name || `random-image-${Date.now()}.svg`}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     'state_changed',
  //     () => {
  //       setIsLoading(true);
  //     },
  //     (err) => {
  //       setIsError(true);
  //       setError(err);
  //       setIsLoading(false);
  //     },
  //     () => {
  //       // download url
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         setAvatar(url);
  //       });
  //     }
  //   );
  // }

  const register = useMutation<ICreateUser, AxiosError<AxiosResponse, any> | undefined, FormData>(
    registerUser,
    {
      onSuccess: ({ user }: ICreateUser) => {
        queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
      }
    }
  );

  const login = useMutation<ICreateUser, AxiosError<AxiosResponse, any> | undefined, IUser>(
    loginUser,
    {
      onSuccess: ({ user }: ICreateUser) => {
        queryClient.setQueryData(REACT_QUERY_KEYS.user, user);
      }
    }
  );

  const update = useMutation<
    ICreateUser,
    AxiosError<AxiosResponse, any> | undefined,
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
    const { email, password, avatar } = user;
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('email', email);
    formData.append('password', password);
    mutateRegister(formData);
  };

  const loginUserMutation = (user: IUser) => {
    mutateLogin(user);
  };

  const updateUserMutation = (user: IFormUpdateUser, id: string | undefined = params.userID) => {
    if (!id) return;
    mutateUpdate({ user, id });
  };

  // useEffect(() => {
  //   avatar &&
  //     userData &&
  //     mutateRegister({ email: userData.email, password: userData.password, avatar });
  // }, [avatar]);

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

  useEffect(() => {
    setIsSuccess(isSuccessLogin || isSuccessRegister || isSuccessUpdate);
  }, [isSuccessLogin, isSuccessRegister, isSuccessUpdate]);

  return {
    registerUserMutation,
    loginUserMutation,
    updateUserMutation,
    error,
    isError,
    isLoading,
    isSuccess
  };
}
