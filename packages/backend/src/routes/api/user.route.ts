import { Router } from 'express';
import { userSchema } from '../../schemas/user.schema';
import userController from '../../controllers/user.controller';
import {
  checkExists,
  logInValidation,
  registerValidation,
  sendResponse,
  updateValidation,
  validateBody,
  verifyToken
} from '../../middlewares/index';
import { IUser } from '../../types/user.type';
import User from '../../models/User';

const router: Router = Router();

router.post(
  '/register',
  validateBody<IUser>(userSchema),
  registerValidation,
  sendResponse(userController.registerUser.bind(userController))
);

router.post(
  '/login',
  validateBody<IUser>(userSchema),
  logInValidation,
  sendResponse(userController.logInUser.bind(userController))
);

router.put(
  '/update/:id',
  verifyToken,
  checkExists<IUser>(User),
  updateValidation,
  sendResponse(userController.updateUser.bind(userController))
);

export default router;
