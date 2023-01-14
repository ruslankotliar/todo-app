import { URLSearchParams } from 'url';
import { ICreateTodo, IUpdateTodoMutation } from '../interfaces';
import { todoService } from './services';

const getAllTodos = async (id: string, params: URLSearchParams) => {
  const { data } = await todoService.getAllTodos(id, params);
  return data;
};

const getSingleTodo = async (id: string) => {
  const { data } = await todoService.getSingleTodo(id);
  return data;
};

const updateTodo = async ({ todo, id }: IUpdateTodoMutation) => {
  const { data } = await todoService.updateTodo({ todo, id });
  return data;
};

const createTodo = async (todo: ICreateTodo) => {
  const { data } = await todoService.createTodo(todo);
  return data;
};

const removeTodo = async (id: string) => {
  const { data } = await todoService.removeTodo(id);
  return data;
};

export { getAllTodos, getSingleTodo, updateTodo, createTodo, removeTodo };
