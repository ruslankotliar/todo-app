import { NextFunction, Request, Response } from 'express';
import { Model, Types } from 'mongoose';

const checkExists =
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
        throw new Error(`Todo with ${id} does not exist.`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default checkExists;
