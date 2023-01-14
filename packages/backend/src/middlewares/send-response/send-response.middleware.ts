import { Request, Response, NextFunction } from 'express';

export const sendResponse =
  (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await controller(req);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
