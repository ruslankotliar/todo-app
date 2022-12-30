import { Request, Response, NextFunction } from 'express';
import { ITodo } from '../../types/todos.type';

export const sendResponse =
  (controller: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const responseBody: ITodo | null | Array<ITodo> = await controller(req);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  };
