/* eslint-disable newline-per-chained-call */
import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const validateBody = () => async (_: Request, res: Response, next: NextFunction) => {
  await check('title').isString().notEmpty().isLength({ min: 3 }).run(_);
  const errors = validationResult(_);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validateBody;
