import { Request, Response } from 'express';
import { createCategoriesService } from '../services/categories/createCategories.service';
import { listAllCategoriesService } from '../services/categories/retrieveCategories.service';
import { listCategoryByIdService } from '../services/categories/retrieveCategoryById.service';

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload = req.body;
  const newCategory = await createCategoriesService(payload);

  return res.status(201).json(newCategory);
};

export const listAllCategoriesController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const allCategories = await listAllCategoriesService();

  return res.json(allCategories);
};

export const listCategoryByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  const category = await listCategoryByIdService(id);
  return res.json(category);
};
