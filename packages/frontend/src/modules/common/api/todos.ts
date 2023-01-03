import { ICreateTodo, IUpdateTodoMutation } from '../interfaces';
import { todoService } from './services';

export const getAllTodos = async () => {
  const { data } = await todoService.getAllTodos();
  return data;
};

export const getSingleTodo = async (id: string) => {
  const { data } = await todoService.getSingleTodo(id);
  return data;
};

export const updateTodo = async ({ todo, id }: IUpdateTodoMutation) => {
  const { data } = await todoService.updateTodo(todo, id);
  return data;
};

export const createTodo = async (todo: ICreateTodo) => {
  const { data } = await todoService.createTodo(todo);
  return data;
};

export const removeTodo = async (id: string) => {
  const { data } = await todoService.removeTodo(id);
  return data;
};
