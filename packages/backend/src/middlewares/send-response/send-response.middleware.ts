import { Request, Response, NextFunction } from 'express';

export const sendResponse =
  (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller(req);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
