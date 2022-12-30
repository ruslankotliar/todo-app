import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody =
  <T>(schema: ObjectSchema) =>
  async (req: Request<{ id: string }, {}, T>, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    next();
  };
