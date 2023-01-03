import { NextFunction, Request, Response } from 'express';
import { Model, Types } from 'mongoose';

export const checkExists =
  <T>(model: Model<T>) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new Error('ID is not correct!');
      }
      const exists = await model.findById(id);
      if (!exists) {
        throw new Error(`${id} does not exist in DB.`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };