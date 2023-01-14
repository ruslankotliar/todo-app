import { URLSearchParams } from 'url';

import { ICreateTodo, IUpdateTodoMutation } from '../../interfaces';
import HttpService from './http.service';

import { BACKEND_KEYS } from '../../consts/app-keys.const';

class TodoService extends HttpService {
  getAllTodos(id: string, params: URLSearchParams) {
    return this.get({ url: `${BACKEND_KEYS.TODOS}${id}?${params}` });
  }

  getSingleTodo(id: string) {
    return this.get({ url: `${BACKEND_KEYS.GET_TODO}${id}` });
  }

  updateTodo({ todo, id }: IUpdateTodoMutation) {
    return this.put({ url: `${BACKEND_KEYS.UPDATE_TODO}${id}`, data: todo });
  }

  createTodo(todo: ICreateTodo) {
    return this.post({ url: BACKEND_KEYS.CREATE_TODO, data: todo });
  }

  removeTodo(id: string) {
    return this.delete({ url: `${BACKEND_KEYS.DELETE_TODO}${id}` });
  }
}

export const todoService = new TodoService();
