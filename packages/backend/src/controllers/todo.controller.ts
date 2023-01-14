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

  async getAllTodo(req: TypedRequestParams<GetById>) {
    const { id } = req.params;
    const { filters, pagination } = queryHelper(req.query);
    const todos = await this.todoService.findAll(id, filters, pagination);
    return todos;
  }

  async getOneTodo(req: TypedRequestParams<GetById>) {
    const { id } = req.params;
    const todo = await this.todoService.findOne(id);
    return todo;
  }

  async createOneTodo(req: TypedRequestBody<CreateTodo>) {
    const { body } = req;
    const newTodo = await this.todoService.createOne(body);
    return newTodo;
  }

  async updateOneTodo(
    req: TypedRequestParams<UpdateTodoParams> & TypedRequestBody<UpdateTodoBody>
  ) {
    const { id } = req.params;
    const { body } = req;
    const updatedTodo = await this.todoService.updateOne(id, body);
    return updatedTodo;
  }

  async deleteOneTodo(req: TypedRequestParams<DeleteTodoById>) {
    const { id } = req.params;
    const deletedTodo = await this.todoService.deleteOne(id);
    return deletedTodo;
  }
}

const todoController = new TodoController(new TodoService());

export default todoController;
