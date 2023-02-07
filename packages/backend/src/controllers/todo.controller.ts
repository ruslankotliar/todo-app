import { queryHelper } from '../helpers/query.helper';
import TodoService from '../services/todo.service';
import { TypedRequestBody, TypedRequestParams } from '../types/controllers.type';
import {
  GetById,
  CreateTodo,
  UpdateTodoBody,
  DeleteTodoById,
  UpdateTodoParams
} from '../types/todos.type';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo({ params, query }: TypedRequestParams<GetById>) {
    const { id } = params;
    const { filters, pagination } = queryHelper(query);
    const todos = await this.todoService.findAll(id, filters, pagination);
    return todos;
  }

  async getOneTodo({ params }: TypedRequestParams<GetById>) {
    const { id } = params;
    const todo = await this.todoService.findOne(id);
    return todo;
  }

  async createOneTodo({ body }: TypedRequestBody<CreateTodo>) {
    const newTodo = await this.todoService.createOne(body);
    return newTodo;
  }

  async updateOneTodo({
    params,
    body
  }: TypedRequestParams<UpdateTodoParams> & TypedRequestBody<UpdateTodoBody>) {
    const { id } = params;
    const updatedTodo = await this.todoService.updateOne(id, body);
    return updatedTodo;
  }

  async deleteOneTodo({ params }: TypedRequestParams<DeleteTodoById>) {
    const { id } = params;
    const deletedTodo = await this.todoService.deleteOne(id);
    return deletedTodo;
  }
}

const todoController = new TodoController(new TodoService());

export default todoController;
