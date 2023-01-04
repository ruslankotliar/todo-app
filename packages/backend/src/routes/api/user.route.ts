import { Router } from 'express';
import { userSchema } from '../../schemas/user.schema';
import userController from '../../controllers/user.controller';
import { checkExists, sendResponse, validateBody, verifyToken } from '../../middlewares/index';
import { IUser } from '../../types/user.type';
import User from '../../models/User';

const router: Router = Router();

router.post(
  '/sign-up',
  validateBody<IUser>(userSchema),
  sendResponse(userController.registerUser.bind(userController))
);

router.post(
  '/sign-in',
  validateBody<IUser>(userSchema),
  sendResponse(userController.signInUser.bind(userController))
);

router.put(
  '/update-user/:id',
  checkExists<IUser>(User),
  verifyToken,
  sendResponse(userController.changePassword.bind(userController))
);

export default router;
