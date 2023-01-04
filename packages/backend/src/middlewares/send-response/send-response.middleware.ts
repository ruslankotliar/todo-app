import { Request, Response, NextFunction } from 'express';
import { signJwt } from '../../utils/jwt';

export const sendResponse =
  (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await controller(req);
      const token = await signJwt(data._id, data.email);
      data.token = token;
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
