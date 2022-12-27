import Todo from '../models/Todo';
import { ITodo } from '../types/todos.type';

export default class TodoService {
  async findAll() {
    const todos: Array<ITodo> | null = await Todo.find({}).sort({ createdAt: -1 });
    return todos;
  }

  async findOne(id: String) {
    const todo: ITodo | null = await Todo.findOne({ _id: id });
    return todo;
  }

  async createOne(body: ITodo) {
    const newTodo = new Todo(body);
    const todo = await newTodo.save();
    return todo;
  }

  async updateOne(id: String, body: ITodo) {
    const todo: ITodo | null = await Todo.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    return todo;
  }

  async deleteOne(id: String) {
    const todo: ITodo | null = await Todo.findByIdAndDelete(id);
    return todo;
  }
}
