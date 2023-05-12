import { Router } from 'express';
import {
  createUserSchema,
  updateUserShcemaToParse,
} from '../schemas/users.schema';
import { validateBodyMiddleware } from '../middlewares/validBody.middleware';
import { verifyEmailMiddleware } from '../middlewares/verifyEmail.middleware';
import {
  createUserController,
  deleteUserController,
  readUsersController,
  updateUserController,
} from '../controllers/user.controller';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.midleware';
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware';
import { VerifyUserIdMiddleware } from '../middlewares/validUserId.middleware';

export const usersRoutes: Router = Router();

usersRoutes.post(
  '',
  validateBodyMiddleware(createUserSchema),
  verifyEmailMiddleware,
  createUserController
);

usersRoutes.get(
  '',
  verifyTokenMiddleware,
  isAdminMiddleware,
  readUsersController
);

usersRoutes.delete(
  '/:id',
  verifyTokenMiddleware,
  VerifyUserIdMiddleware,
  isAdminMiddleware,
  deleteUserController
);

usersRoutes.patch(
  '/:id',
  verifyTokenMiddleware,
  VerifyUserIdMiddleware,
  isAdminMiddleware,
  validateBodyMiddleware(updateUserShcemaToParse),
  verifyEmailMiddleware,
  updateUserController
);
