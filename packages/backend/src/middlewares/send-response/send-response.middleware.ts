import { Request, Response, NextFunction } from 'express';
import { signJwt } from '../../utils/jwt';

export const sendResponse =
  (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await controller(req);
      const token = await signJwt(data._id, data.email);
      res.status(200).json({ data, token });
    } catch (error) {
      next(error);
    }
  };
