import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../../utils/jwt';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) throw new Error('You are not logged in.');

  const decoded = await verifyJwt(token);
  if (!decoded) throw new Error('Invalid JWT');
  next();
}
