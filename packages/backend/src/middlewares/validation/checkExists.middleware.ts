import { NextFunction, Request, Response } from 'express';
import { Model, Types } from 'mongoose';

export const checkExists =
  <T>(model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new Error('Invalid ID');
      }
      const exists = await model.findById(id);
      if (!exists) {
        throw new Error('Does not exist');
      }
      req.body.exists = exists;
      next();
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  };
