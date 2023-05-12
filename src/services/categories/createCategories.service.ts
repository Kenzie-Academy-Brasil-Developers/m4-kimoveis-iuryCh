import { Repository } from 'typeorm';
import {
  TCategoryRequest,
  TCategoryResponse,
} from '../../interfaces/categories.interface';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { AppError } from '../../errors';

export const createCategoriesService = async (
  payload: TCategoryRequest
): Promise<TCategoryResponse> => {
  const categoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoriesRepo.findOne({
    where: {
      name: payload.name,
    },
  });
  if (category) throw new AppError('Category already exists', 409);

  const newCategory: TCategoryResponse = categoriesRepo.create(payload);

  await categoriesRepo.save(newCategory);

  return newCategory;
};
