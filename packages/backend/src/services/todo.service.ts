import Todo from '../models/Todo';
import { ITodo, UpdateTodoBody, CreateTodo, Filters, Pagination } from '../types/todos.type';

export default class TodoService {
  async findAll(id: string, filters: Filters, pagination: Pagination) {
    await Todo.createIndexes({ title: 'text' });
    const todos: Array<ITodo> | null = await Todo.aggregate([
      {
        $match: {
          ...filters,
          userID: id
        }
      },
      ...pagination
    ]).sort({
      createdAt: -1
    });
    return todos;
  }

  async findOne(id: string) {
    const todo: ITodo | null = await Todo.findOne({ _id: id });
    return todo;
  }

  async createOne(body: CreateTodo) {
    const newTodo = new Todo(body);
    const todo = await newTodo.save();
    return todo;
  }

  async updateOne(id: string, body: UpdateTodoBody) {
    const todo: ITodo | null = await Todo.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    return todo;
  }

  async deleteOne(id: string) {
    const todo: ITodo | null = await Todo.findByIdAndDelete(id);
    return todo;
  }
}
