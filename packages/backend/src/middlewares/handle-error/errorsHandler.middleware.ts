/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let errMessage = 'Unknown Error';
  if (error instanceof Error) errMessage = error.message;
  res.status(500).json({
    message: errMessage,
    stack: process.env.NODE_ENV === 'development' ? error.stack : {}
  });
};
