import { ICreateTodo, IUpdateTodoMutation } from '../../interfaces';
import HttpService from './http.service';

class TodoService extends HttpService {
  async getAllTodos() {
    const { data } = await this.get({ url: 'todos' }, false);
    return data;
  }

  async getSingleTodo(id: string) {
    const { data } = await this.get({ url: `todos/get-todo/${id}` }, false);
    return data;
  }

  async updateTodo({ todo, id }: IUpdateTodoMutation) {
    const { data } = await this.put({ url: `todos/update-todo/${id}`, data: todo }, false);
    return data;
  }

  async createTodo(todo: ICreateTodo) {
    const { data } = await this.post({ url: 'todos/create-todo', data: todo }, false);
    return data;
  }

  async removeTodo(id: string) {
    const { data } = await this.delete({ url: `todos/delete-todo/${id}` }, false);
    return data;
  }
}

export const todoService = new TodoService();
