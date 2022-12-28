import { Request, Response, NextFunction } from 'express';
import { ITodo } from '../../types/todos.type';

const sendResponse =
  (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseBody: ITodo | null = await controller(req);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  };

export default sendResponse;
