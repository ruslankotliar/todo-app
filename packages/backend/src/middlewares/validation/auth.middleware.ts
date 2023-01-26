import { NextFunction, Request, Response } from 'express';

import { verifyJwt } from '../../utils/jwt';

import User from '../../models/User';

import { comparePasswords, hashPassword } from '../../utils/password';
import { uploadAvatar } from '../../utils/avatar-upload';

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

    // check is user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error('User does not exist');

    // validate password
    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) throw new Error('Unauthorized');

    // send user in controller
    req.body = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
}

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const { avatar, email, password } = req.body;

    // check whether user is unique
    const user = await User.findOne({ email });
    if (user) throw new Error('User already exists');

    // hash password
    const hashedPassword = await hashPassword(password);

    // upload image to firebase
    const firebaseAvatarURL = await uploadAvatar(avatar, hashedPassword);

    // send data in controller
    req.body = { email, password: hashedPassword, avatar: firebaseAvatarURL };

    next();
  } catch (error) {
    res.status(409).json({
      message: error.message
    });
  }
}

export async function updateValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, newPassword, avatar, exists: user } = req.body;

    // validate password
    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) throw new Error('Unauthorized');

    // hash password
    const hashedPassword = await hashPassword(newPassword);

    // upload image to firebase
    const firebaseAvatarURL = await uploadAvatar(avatar, hashedPassword);

    // send data in controller
    req.body = { email, password: hashedPassword, avatar: firebaseAvatarURL };

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
}
