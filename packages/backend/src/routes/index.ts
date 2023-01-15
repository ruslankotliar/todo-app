import { Application } from 'express';
import { verifyToken } from '../middlewares/validation/auth.middleware';
import todosRouter from './api/todos.route';
import userRouter from './api/user.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/todos', verifyToken, todosRouter);
    this.app.use('/api/user', userRouter);
  }
}

export default AppRouter;
