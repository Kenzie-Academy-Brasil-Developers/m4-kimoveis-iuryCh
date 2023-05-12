import { z } from 'zod';
import { createAddressSchema } from './address.schema';
import { categoryResponseSchema } from './category.schema';
import { returnAddressSchema } from './address.schema';

export const createRealEstateSchema = z.object({
  value: z.string().or(z.number()).default(0),
  size: z.number().int().positive(),
  address: createAddressSchema,
  categoryId: z.number().int().positive(),
});
export const returnRealEstateSchema = createRealEstateSchema
  .extend({
    id: z.number(),
    category: categoryResponseSchema,
    address: returnAddressSchema,
  })
  .omit({ categoryId: true });

export const returnAllRealEstateSchema = z.array(returnRealEstateSchema);
