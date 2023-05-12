import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().max(45),
});

export const categoryResponseSchema = createCategorySchema.extend({
  id: z.number(),
});
