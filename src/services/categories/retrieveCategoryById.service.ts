import { Repository } from 'typeorm';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';

export const listCategoryByIdService = async (
  categoryId: number
): Promise<Category | null> => {
  const categoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const selectedCategory: Category | null = await categoriesRepo.findOne({
    where: {
      id: categoryId,
    },
    relations: { realEstate: true },
  });

  if (!selectedCategory) throw new AppError('Category not found', 404);

  return selectedCategory;
};
