import { IUpdateTodo, ICreateTodo } from '../../interfaces';
import HttpService from './http.service';

class TodoService extends HttpService {
  getAllTodos() {
    return this.get({ url: 'todos' }, false);
  }

  getSingleTodo(id: string) {
    return this.get({ url: `todos/get-todo/${id}` }, false);
  }

  updateTodo(todo: IUpdateTodo, id: string) {
    return this.put({ url: `todos/update-todo/${id}`, data: todo }, false);
  }

  createTodo(todo: ICreateTodo) {
    return this.post({ url: 'todos/create-todo', data: todo }, false);
  }

  removeTodo(id: string) {
    return this.delete({ url: `todos/delete-todo/${id}` }, false);
  }
}

export const todoService = new TodoService();
