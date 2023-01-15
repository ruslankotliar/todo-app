/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-confusing-arrow */
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { queryClient } from '../utils/query-client.util';

import { getAllTodos, getSingleTodo, updateTodo, createTodo, removeTodo } from '../api/todos';

import { REACT_QUERY_KEYS } from '../consts/app-keys.const';
import { ICreateTodo, IStorageUser, ITodo, IUpdateTodo, IUpdateTodoMutation } from '../interfaces';
import { useLocalStorage } from './local-storage.hook';
import { Params } from '../types';

function useSingleTodo(todoID: string | undefined) {
  if (!todoID) return { isLoading: false, isError: false, error: null, data: null };
  const singleTodo = useQuery<ITodo, AxiosError>(REACT_QUERY_KEYS.todo, () =>
    getSingleTodo(todoID)
  );

  return singleTodo;
}

function useAllTodos(id: string | undefined) {
  const [trigger, setTrigger] = useState<number>(Date.now());
  const [searchParams] = useSearchParams();

  let allTodos: any;
  if (!id) {
    allTodos = { isLoading: false, isError: true, error: { message: 'Unauthorized' }, data: null };
  } else {
    allTodos = useQuery<ITodo[], AxiosError>([REACT_QUERY_KEYS.todos, trigger], () =>
      getAllTodos(id, searchParams)
    );
  }
  return { allTodos, setTrigger };
}

export function useTodos() {
  const navigate = useNavigate();
  const { todoID } = useParams<Params>();
  const [error, setError] = useState<AxiosError<unknown, any> | null>();
  const [isError, setIsError] = useState<Boolean>(false);
  const [storageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined
  });

  const { allTodos, setTrigger } = useAllTodos(storageUser?.id || undefined);
  const singleTodo = useSingleTodo(todoID || undefined);

  const create = useMutation<ITodo, AxiosError, ICreateTodo>(createTodo, {
    onSuccess: (data: ITodo) => {
      if (data.private) return;
      queryClient.setQueryData(
        REACT_QUERY_KEYS.todos,
        (currentTodos: ITodo[] = []) => [...currentTodos, data] as ITodo[]
      );
    }
  });

  const update = useMutation<ITodo, AxiosError, IUpdateTodoMutation>(updateTodo, {
    onSuccess: (data: ITodo) => {
      queryClient.setQueryData(REACT_QUERY_KEYS.todo, data);
      if (data.private) return;
      queryClient.setQueryData(
        REACT_QUERY_KEYS.todos,
        (currentTodos: ITodo[] = []) =>
          currentTodos.map((todo: ITodo) => (todo._id === data._id ? data : todo)) as ITodo[]
      );
    }
  });

  const remove = useMutation<ITodo, AxiosError, string>(removeTodo, {
    onSuccess: (data: ITodo) => {
      queryClient.setQueryData(
        REACT_QUERY_KEYS.todos,
        (currentTodos: ITodo[] = []) =>
          currentTodos.filter((todo: ITodo) => todo._id !== data._id) as ITodo[]
      );
    }
  });

  const { mutate: mutateRemove, isError: isErrorRemove, error: errorRemove } = remove;
  const {
    mutate: mutateUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate
  } = update;
  const {
    mutate: mutateCreate,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate
  } = create;

  const updateTodoMutation = (todo: IUpdateTodo, id: string | undefined = todoID) => {
    const { id: userID } = storageUser;
    if (!userID || !id) return;
    todo = { ...todo, userID };
    mutateUpdate({ todo, id });
  };

  const removeTodoMutation = (id: string) => {
    mutateRemove(id);
  };

  const createTodoMutation = (todo: ICreateTodo) => {
    const { id: userID } = storageUser;
    if (!userID) return;
    mutateCreate({ ...todo, userID });
  };

  useEffect(() => {
    // const redirect: Boolean = navigate.location.pathname.includes('update-todo');
    // const url: string = navigate.location.pathname.replace('update', 'single');
    // isSuccessUpdate && redirect && navigate('/');
    (isSuccessUpdate || isSuccessCreate) && navigate('/');
  }, [isSuccessUpdate, isSuccessCreate]);

  useEffect(() => {
    setIsError(isErrorCreate || isErrorRemove || isErrorUpdate);
    setError(errorCreate || errorRemove || errorUpdate);
  }, [isErrorCreate, isErrorRemove, isErrorUpdate]);

  return {
    isError,
    error,
    allTodos,
    singleTodo,
    setTrigger,
    updateTodoMutation,
    removeTodoMutation,
    createTodoMutation
  };
}
