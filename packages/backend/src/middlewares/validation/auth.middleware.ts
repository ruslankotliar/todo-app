import { NextFunction, Request, Response } from 'express';

import { Fields, Files } from 'formidable';
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
    req.body.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
}

interface RegisterFields extends Fields {
  email: string;
  password: string;
}

interface RegisterFiles extends Files {
  avatar: any;
}

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const fields = req.fields as RegisterFields;
    const files = req.files as RegisterFiles;

    const { avatar } = files;
    const { email, password } = fields;

    // check whether user is unique
    const user = await User.findOne({ email });
    if (user) throw new Error('Conflict');

    // hash password
    const hashedPassword = await hashPassword(password);

    // upload image to firebase
    const firebaseAvatarURL = await uploadAvatar(avatar, hashedPassword);

    // send data in controller
    req.body.email = email;
    req.body.password = hashedPassword;
    req.body.avatar = firebaseAvatarURL;

    next();
  } catch (error) {
    res.status(409).json({
      message: error.message
    });
  }
}

export async function updateValidation(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, newPassword, exists: user } = req.body;

    // validate password
    const validPassword = await comparePasswords(password, user.password);
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
