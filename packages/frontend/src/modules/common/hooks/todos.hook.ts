/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-confusing-arrow */
import { useEffect, useState } from 'react';

import {
  AxiosError,
  useQuery,
  useMutation,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from '../../deps';

import { queryClient } from '../utils/query-client.util';

import { getAllTodos, getSingleTodo, updateTodo, createTodo, removeTodo } from '../api/todos';

import { REACT_QUERY_KEYS } from '../consts/app-keys.const';
import {
  IAxiosResponse,
  ICreateTodo,
  IStorageUser,
  ITodo,
  IUpdateTodo,
  IUpdateTodoMutation
} from '../interfaces';
import { useLocalStorage } from './local-storage.hook';
import { Params } from '../types';

interface ITodoResponse {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface ISingleTodoResponse extends ITodoResponse {
  error: AxiosError<IAxiosResponse, any> | null;
  data: ITodo | undefined;
}

interface IAllTodoResponse extends ITodoResponse {
  error: AxiosError<IAxiosResponse, any> | null | { message: string };
  data: ITodo[] | undefined;
}

function useSingleTodo(id: string | undefined) {
  let singleTodo: ISingleTodoResponse;
  if (!id) {
    singleTodo = {
      isLoading: false,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined
    };
  } else {
    singleTodo = useQuery<ITodo, AxiosError<IAxiosResponse, any> | null>(
      REACT_QUERY_KEYS.TODO,
      () => getSingleTodo(id)
    );
  }
  return singleTodo;
}

function useAllTodos(id: string | undefined) {
  const [trigger, setTrigger] = useState<number>(Date.now());
  const [searchParams] = useSearchParams();

  let allTodos: IAllTodoResponse;
  if (!id) {
    allTodos = {
      isLoading: false,
      isError: true,
      isSuccess: false,
      error: { message: 'Unauthorized' },
      data: undefined
    };
  } else {
    allTodos = useQuery<ITodo[], AxiosError<IAxiosResponse, any> | null>(
      [REACT_QUERY_KEYS.TODOS, trigger],
      () => getAllTodos(id, searchParams)
    );
  }
  return { allTodos, setTrigger };
}

export function useTodos() {
  const navigate = useNavigate();
  const location = useLocation();
  const { todoID } = useParams<Params>();
  const [error, setError] = useState<AxiosError<IAxiosResponse, any> | undefined>();
  const [isError, setIsError] = useState<Boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storageUser] = useLocalStorage<IStorageUser>('todo-app-user', {
    email: undefined,
    id: undefined,
    avatar: undefined
  });

  const { allTodos, setTrigger } = useAllTodos(storageUser?.id || undefined);
  const singleTodo = useSingleTodo(todoID || undefined);

  const create = useMutation<ITodo, AxiosError<IAxiosResponse, any> | undefined, ICreateTodo>(
    createTodo,
    {
      onSuccess: (data: ITodo) => {
        if (data.private) return;
        queryClient.setQueryData(
          REACT_QUERY_KEYS.TODOS,
          (currentTodos: ITodo[] = []) => [...currentTodos, data] as ITodo[]
        );
      }
    }
  );

  const update = useMutation<
    ITodo,
    AxiosError<IAxiosResponse, any> | undefined,
    IUpdateTodoMutation
  >(updateTodo, {
    onSuccess: (data: ITodo) => {
      queryClient.setQueryData(REACT_QUERY_KEYS.TODO, data);
      if (data.private) return;
      queryClient.setQueryData(
        REACT_QUERY_KEYS.TODOS,
        (currentTodos: ITodo[] = []) =>
          currentTodos.map((todo: ITodo) => (todo._id === data._id ? data : todo)) as ITodo[]
      );
    }
  });

  const remove = useMutation<ITodo, AxiosError<IAxiosResponse, any> | undefined, string>(
    removeTodo,
    {
      onSuccess: (data: ITodo) => {
        queryClient.setQueryData(
          REACT_QUERY_KEYS.TODOS,
          (currentTodos: ITodo[] = []) =>
            currentTodos.filter((todo: ITodo) => todo._id !== data._id) as ITodo[]
        );
      }
    }
  );

  const {
    mutate: mutateRemove,
    isError: isErrorRemove,
    isSuccess: isSuccessRemove,
    error: errorRemove,
    isLoading: isLoadingRemove
  } = remove;
  const {
    mutate: mutateUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isLoading: isLoadingUpdate
  } = update;
  const {
    mutate: mutateCreate,
    isSuccess: isSuccessCreate,
    isError: isErrorCreate,
    error: errorCreate,
    isLoading: isLoadingCreate
  } = create;

  const updateTodoMutation = (todo: IUpdateTodo, id: string | undefined = todoID) => {
    const { id: userID } = storageUser;
    if (!userID || !id) return;
    todo = { ...todo, userID };
    mutateUpdate({ todo, id });
  };

  const removeTodoMutation = (id: string) => {
    // update all todos trigger
    setTrigger(Date.now());
    mutateRemove(id);
  };

  const createTodoMutation = (todo: ICreateTodo) => {
    const { id: userID } = storageUser;
    if (!userID) return;
    mutateCreate({ ...todo, userID });
  };

  useEffect(() => {
    const redirect: Boolean = location.pathname.includes('update-todo');
    if (isSuccessCreate || (isSuccessUpdate && redirect)) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }, [isSuccessUpdate, isSuccessCreate]);

  useEffect(() => {
    setIsError(isErrorCreate || isErrorRemove || isErrorUpdate);
    setError(errorCreate || errorRemove || errorUpdate || undefined);
  }, [isErrorCreate, isErrorRemove, isErrorUpdate]);

  useEffect(() => {
    setIsSuccess(isSuccessUpdate || isSuccessCreate || isSuccessRemove);
  }, [isSuccessCreate, isSuccessRemove, isSuccessUpdate]);

  useEffect(() => {
    setIsLoading(isLoadingCreate || isLoadingRemove || isLoadingUpdate);
  }, [isLoadingCreate, isLoadingRemove, isLoadingUpdate]);

  return {
    isSuccess,
    isError,
    isLoading,
    error,
    allTodos,
    singleTodo,
    setTrigger,
    updateTodoMutation,
    removeTodoMutation,
    createTodoMutation,
    isSuccessUpdate
  };
}
