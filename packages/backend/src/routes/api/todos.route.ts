import { Router } from 'express';
import sendResponse from '../../middlewares/send-response/send-response.middleware';
import todoController from '../../controllers/todo.controller';
import checkExists from '../../middlewares/validation/checkExists.middleware';
import Todo from '../../models/Todo';
import validateBody from '../../middlewares/validation/validateBody.middleware';
import { ITodo } from '../../types/todos.type';

const todosRouter: Router = Router();

todosRouter.get('', sendResponse(todoController.getAllTodo.bind(todoController)));
todosRouter.get('/get-todo/:id', sendResponse(todoController.getOneTodo.bind(todoController)));
todosRouter.post(
  '/create-todo',
  validateBody(),
  sendResponse(todoController.createOneTodo.bind(todoController))
);
todosRouter.put(
  '/update-todo/:id',
  checkExists<ITodo>(Todo),
  validateBody(),
  sendResponse(todoController.updateOneTodo.bind(todoController))
);
todosRouter.delete(
  '/delete-todo/:id',
  sendResponse(todoController.deleteOneTodo.bind(todoController))
);

export default todosRouter;
