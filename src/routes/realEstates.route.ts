import { Router } from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.midleware';
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware';
import {
  createRealEstateController,
  listAllRealEstateController,
} from '../controllers/realEstate.controller';
import { validateBodyMiddleware } from '../middlewares/validBody.middleware';
import { createRealEstateSchema } from '../schemas/realEstate.schema';

export const realEstateRoutes = Router();

realEstateRoutes.post(
  '',
  verifyTokenMiddleware,
  isAdminMiddleware,
  validateBodyMiddleware(createRealEstateSchema),
  createRealEstateController
);
realEstateRoutes.get('', listAllRealEstateController);
