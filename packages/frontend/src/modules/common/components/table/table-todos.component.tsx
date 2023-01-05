/* eslint-disable react/jsx-curly-newline */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import json2mq from 'json2mq';

import { useMediaQuery } from '@mui/material';

import { TodosTableLayout } from './table-layout';
import { ITodo, IUpdateTodo, IUpdateTodoMutation } from '../../interfaces';

import { todoService } from '../../api/services';
import { TodosDesktopComponent } from './table-desktop';
import { TodosTabletComponent } from './table-tablet';
import { TodosMobileComponent } from './table-mobile';
import { REACT_QUERY_KEYS } from '../../consts/app-keys.const';

export const TodosTableComponent = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filterTodos, setFilterTodos] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading, isError, error, data } = useQuery<ITodo[], Error>(
    REACT_QUERY_KEYS.todos,
    todoService.getAllTodos
  );
  const { mutate: mutateDelete } = useMutation<ITodo, Error, string>(todoService.removeTodo);
  const { mutate: mutateUpdate } = useMutation<ITodo, Error, IUpdateTodoMutation>(
    todoService.updateTodo
  );

  // MEDIA QUERIES
  const mobile = useMediaQuery(
    json2mq({
      maxWidth: 424
    })
  );
  const tablet = useMediaQuery(
    json2mq({
      minWidth: 425,
      maxWidth: 767
    })
  );
  const desktop = useMediaQuery(
    json2mq({
      minWidth: 768
    })
  );

  // UPDATE TODO
  const updateTodoCompleteStatus = (todo: IUpdateTodo, id: string) => {
    mutateUpdate({ todo, id });
  };

  //  DELETE TODO
  // remove from client side and rerender component
  const removeTodoFromState = (id: string) => {
    const newTodos = todos.filter((todo) => todo._id !== id);
    setTodos(newTodos);
  };

  // remove from DB
  const removeTodoFromDB = async (id: string) => {
    mutateDelete(id);
    removeTodoFromState(id);
  };

  // PAGINATION (template)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // this is done to improve the efficiency of the application
  // in 'data' all todos will be always saved
  // if 'todos' all FILTERED or SEARCHED todos will be stored
  // furthermore, when we delete a todo, new request is not send...
  // ... todos are updating on front end in this case
  useEffect(() => {
    if (!todos.length && data) setTodos(data);
  }, [data]);

  // for future query implementation
  useEffect(() => {}, [searchQuery]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>Error! {error?.message}</div>;
  return (
    <TodosTableLayout
      filterTodos={filterTodos}
      setSearchQuery={setSearchQuery}
      setFilterTodos={setFilterTodos}
    >
      {desktop && (
        <TodosDesktopComponent
          todos={todos}
          page={page}
          rowsPerPage={rowsPerPage}
          updateTodoCompleteStatus={updateTodoCompleteStatus}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          removeTodoFromDB={removeTodoFromDB}
        />
      )}
      {tablet && (
        <TodosTabletComponent
          todos={todos}
          updateTodoCompleteStatus={updateTodoCompleteStatus}
          removeTodoFromDB={removeTodoFromDB}
        />
      )}
      {mobile && (
        <TodosMobileComponent
          todos={todos}
          updateTodoCompleteStatus={updateTodoCompleteStatus}
          removeTodoFromDB={removeTodoFromDB}
        />
      )}
    </TodosTableLayout>
  );
};
