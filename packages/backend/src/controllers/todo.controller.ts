import { Response, Request } from 'express';
import { check, validationResult } from 'express-validator';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    // TODO: Write your implementation here
    try {
      const todos = await this.todoService.findAll();
      res.status(200).json({
        message: 'Get all todos successfully.',
        todos
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOneTodo(_: Request, res: Response) {
    try {
      const { id } = _.params;
      const todo = await this.todoService.findOne(id);
      if (!todo) {
        return res.status(404).json({ message: `No todo with id: ${id}` });
      }
      res.status(200).json({
        message: 'Get one todo successfully.',
        todo
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createOneTodo(_: Request, res: Response) {
    await check('title', 'Title cannot be blank').not().isEmpty().isLength({ max: 20 }).run(_);
    const errors = validationResult(_);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array()
      });
    } else {
      try {
        const newTodo = await this.todoService.createOne(_.body);
        res.status(200).json({
          message: 'Todo created successfully.',
          todo: newTodo
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async updateOneTodo(_: Request, res: Response) {
    await check('title', 'Title cannot be blank').not().isEmpty().isLength({ max: 20 }).run(_);
    const errors = validationResult(_);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: errors.array()
      });
    } else {
      try {
        const { id } = _.params;
        const updatedTodo = await this.todoService.updateOne(id, _.body);
        if (!updatedTodo) {
          return res.status(404).json({ message: `No todo with id: ${id}` });
        }
        res.status(200).json({
          message: `Todo with id: ${id} updated successfully.`,
          todo: updatedTodo
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async deleteOneTodo(_: Request, res: Response) {
    try {
      const { id } = _.params;
      const deletedTodo = await this.todoService.deleteOne(id);
      if (!deletedTodo) {
        return res.status(404).json({ message: `No todo with id: ${id}` });
      }
      res.status(200).json({
        message: `Todo with id: ${id} deleted successfully.`,
        todo: deletedTodo
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const todoController = new TodoController(new TodoService());

export default todoController;
