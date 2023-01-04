import { Router } from 'express';
import { userSchema } from '../../schemas/user.schema';
import userController from '../../controllers/user.controller';
import { sendResponse, validateBody, verifyToken } from '../../middlewares/index';

const router: Router = Router();

router.post(
  '/sign-up',
  validateBody(userSchema),
  sendResponse(userController.registerUser.bind(userController))
);

router.post('/sign-in', sendResponse(userController.signInUser.bind(userController)));

router.put(
  '/update-user/:id',
  verifyToken,
  sendResponse(userController.changePassword.bind(userController))
);

export default router;
