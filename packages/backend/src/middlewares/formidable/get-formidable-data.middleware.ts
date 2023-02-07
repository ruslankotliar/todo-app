import { NextFunction, Request, Response } from 'express';
import { Fields, Files } from 'formidable';

interface UserFields extends Fields {
  email: string;
  password: string;
  newPassword: string;
}

interface UserFiles extends Files {
  avatar: any;
}

export async function getFormidableData(req: Request, res: Response, next: NextFunction) {
  const fields = req.fields as UserFields;
  const files = req.files as UserFiles;

  const { avatar } = files;
  const { email, password, newPassword } = fields;

  req.body = { avatar, email, password, newPassword };

  next();
}
