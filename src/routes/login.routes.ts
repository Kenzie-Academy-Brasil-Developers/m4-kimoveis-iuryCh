import { Router } from 'express';
import { validateBodyMiddleware } from '../middlewares/validBody.middleware';
import { createLoginSchema } from '../schemas/login.schema';
import { createTokenController } from '../controllers/login.controller';

export const loginRoutes = Router();

loginRoutes.post(
  '',
  validateBodyMiddleware(createLoginSchema),
  createTokenController
);
