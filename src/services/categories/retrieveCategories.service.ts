import { Repository } from 'typeorm';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';

export const listAllCategoriesService = async () => {
  const categoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const allCategories: Category[] | null = await categoriesRepo.find();

  return allCategories;
};
