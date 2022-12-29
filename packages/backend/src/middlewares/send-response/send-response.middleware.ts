import { Request, Response, NextFunction } from 'express';
import { ITodo } from '../../types/todos.type';

const sendResponse =
  <T>(controller: T | any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const responseBody: ITodo | null | Array<ITodo> = await controller(req);
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  };

export default sendResponse;
