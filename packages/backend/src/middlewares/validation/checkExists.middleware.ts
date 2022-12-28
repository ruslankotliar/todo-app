import { NextFunction, Request, Response } from 'express';
import { Model, Types } from 'mongoose';
import Todo from '../../models/Todo';

const checkExists =
  (model: Model<any>) => async (req: Request, _: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new Error('ID is not correct!');
      }
      const exists = await model.findById(id);
      if (exists) {
        throw new Error(`${model === Todo ? 'Todo' : 'User'} with ${id} already exists.`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default checkExists;
