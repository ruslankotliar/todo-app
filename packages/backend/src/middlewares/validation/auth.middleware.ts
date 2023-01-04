import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../../types/middleware.type';
import { verifyJwt } from '../../utils/jwt';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) throw new Error('You are not logged in.');

  const decoded = await verifyJwt(token);
  if (!decoded) throw new Error('Invalid JWT');
  (req as CustomRequest).token = decoded;

  next();
}
