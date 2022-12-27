import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('', todoController.getAllTodo.bind(todoController));
todosRouter.get('/get-todo/:id', todoController.getOneTodo.bind(todoController));
todosRouter.get('/create-todo', todoController.createOneTodo.bind(todoController));
todosRouter.get('/update-todo/:id', todoController.updateOneTodo.bind(todoController));
todosRouter.get('/delete-todo/:id', todoController.deleteOneTodo.bind(todoController));

export default todosRouter;
