import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../../utils/jwt';
import { comparePasswords, hashPassword } from '../../utils/password';
import User from '../../models/User';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization');
    if (!token) throw new Error('Unauthorized');

    await verifyJwt(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
}

export async function logInValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    let user;

    // check whether user exists
    try {
      user = await User.findOne({ email });
      if (!user) throw new Error('Does not exist');
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }

    // validate password
    const validPassword = await comparePasswords(password, user?.password || '');
    if (!validPassword) throw new Error('Unauthorized');

    // send user in controller
    req.body.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
}

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, avatar } = req.body;

    // check whether user is unique
    const user = await User.findOne({ email });
    if (user) throw new Error('Conflict');

    // hash password
    const hashedPassword = await hashPassword(password);

    // send data in controller
    req.body.email = email;
    req.body.password = hashedPassword;
    req.body.avatar = avatar;

    next();
  } catch (error) {
    res.status(409).json({
      message: error.message
    });
  }
}

export async function updateValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, newPassword } = req.body;

    // check whether user exists
    const user = await User.findOne({ email });

    // validate password
    const validPassword = await comparePasswords(password, user?.password || '');
    if (!validPassword) throw new Error('Unauthorized');

    // hash password
    const hashedPassword = await hashPassword(newPassword);

    // send data in controller
    req.body.email = email;
    req.body.password = hashedPassword;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
}
