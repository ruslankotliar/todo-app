import { Router } from 'express';
import { validateBody, sendResponse, checkExists } from '../../middlewares/index';
import todoController from '../../controllers/todo.controller';
import Todo from '../../models/Todo';
import { ITodo } from '../../types/todos.type';
import { taskSchema } from '../../schemas/todo.schema';

const todosRouter: Router = Router();

todosRouter.get('/:id', sendResponse(todoController.getAllTodo.bind(todoController)));
todosRouter.get('/get-todo/:id', sendResponse(todoController.getOneTodo.bind(todoController)));
todosRouter.post(
  '/create-todo',
  validateBody<ITodo>(taskSchema),
  sendResponse(todoController.createOneTodo.bind(todoController))
);
todosRouter.put(
  '/update-todo/:id',
  validateBody<ITodo>(taskSchema),
  checkExists<ITodo>(Todo),
  sendResponse(todoController.updateOneTodo.bind(todoController))
);
todosRouter.delete(
  '/delete-todo/:id',
  sendResponse(todoController.deleteOneTodo.bind(todoController))
);

export default todosRouter;
