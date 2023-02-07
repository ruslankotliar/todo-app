import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody =
  <T>(schema: ObjectSchema) =>
  async (req: Request<{ id: string }, {}, T>, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new Error('Invalid body');
      }
      next();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        });
      }
    }
  };
