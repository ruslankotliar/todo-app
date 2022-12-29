/* eslint-disable newline-per-chained-call */
import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const validateBody = () => async (req: Request, res: Response, next: NextFunction) => {
  await check('title').isString().notEmpty().isLength({ min: 3 }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validateBody;
