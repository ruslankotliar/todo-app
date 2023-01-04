import { Router } from 'express';
import { validateBody, sendResponse, checkExists, verifyToken } from '../../middlewares/index';
import todoController from '../../controllers/todo.controller';
import Todo from '../../models/Todo';
import { ITodo } from '../../types/todos.type';
import { taskSchema } from '../../schemas/todo.schema';

const todosRouter: Router = Router();

todosRouter.get('', sendResponse(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
  '/private/:id',
  verifyToken,
  sendResponse(todoController.getAllPrivateTodo.bind(todoController))
);
todosRouter.get('/get-todo/:id', sendResponse(todoController.getOneTodo.bind(todoController)));
todosRouter.post(
  '/create-todo',
  verifyToken,
  validateBody(taskSchema),
  sendResponse(todoController.createOneTodo.bind(todoController))
);
todosRouter.put(
  '/update-todo/:id',
  verifyToken,
  checkExists<ITodo>(Todo),
  validateBody(taskSchema),
  sendResponse(todoController.updateOneTodo.bind(todoController))
);
todosRouter.delete(
  '/delete-todo/:id',
  verifyToken,
  sendResponse(todoController.deleteOneTodo.bind(todoController))
);

export default todosRouter;
