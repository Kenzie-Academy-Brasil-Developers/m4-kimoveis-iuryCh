import { z } from 'zod';
import {
  categoryResponseSchema,
  createCategorySchema,
} from '../schemas/category.schema';

export type TCategoryRequest = z.infer<typeof createCategorySchema>;
export type TCategoryResponse = z.infer<typeof categoryResponseSchema>;
