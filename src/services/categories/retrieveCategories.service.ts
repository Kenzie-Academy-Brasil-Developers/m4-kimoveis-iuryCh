import { Repository } from 'typeorm';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';

export const listAllCategoriesService =
  async (): Promise<Array<Category> | null> => {
    const categoriesRepo: Repository<Category> =
      AppDataSource.getRepository(Category);

    const allCategories: Array<Category> | null = await categoriesRepo.find();

    return allCategories;
  };
