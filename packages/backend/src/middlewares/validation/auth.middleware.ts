import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';

import { verifyJwt } from '../../utils/jwt';
import { comparePasswords, hashPassword } from '../../utils/password';
import User from '../../models/User';
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
    let user;

    // check whether user exists
    try {
      user = await User.findOne({ email });
      if (!user) throw new Error('User does not exist.');
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
    let avatar;
    let email;
    let password;
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      avatar = files.avatar;
      email = fields.email;
      password = fields.password;
      if (err) throw new Error('Error parsing form body');
    });

    // check whether user is unique
    const user = await User.findOne({ email });
    if (user) throw new Error('Conflict');
    if (!password) throw new Error('Invalid credentials');

    // hash password
    const hashedPassword = await hashPassword(password);

    // upload image to firebase
    const firebaseAvatarURL = await uploadAvatar(avatar, hashedPassword);

    if (!firebaseAvatarURL) throw new Error('Error uploading avatar to DB');

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
