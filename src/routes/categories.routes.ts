import { Router } from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.midleware';
import { validateBodyMiddleware } from '../middlewares/validBody.middleware';
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware';
import { createCategorySchema } from '../schemas/category.schema';
import {
  createCategoryController,
  listAllCategoriesController,
  listCategoryByIdController,
} from '../controllers/categories.controllers';

export const categoriesRoutes = Router();

categoriesRoutes.post(
  '',
  verifyTokenMiddleware,
  validateBodyMiddleware(createCategorySchema),
  isAdminMiddleware,
  createCategoryController
);
categoriesRoutes.get('', listAllCategoriesController);
categoriesRoutes.get('/:id/realEstate', listCategoryByIdController);
