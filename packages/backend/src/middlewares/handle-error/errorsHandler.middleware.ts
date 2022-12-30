/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let errMessage = 'Unknown Error';
  const errStatus = 500;
  if (error instanceof Error) errMessage = error.message;
  res.status(errStatus).json({
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV === 'development' ? error.stack : {}
  });
};
