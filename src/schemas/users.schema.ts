import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().optional().default(false),
});

export const createdUserSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({
    password: true,
  });
export const updatedResturnSchema = createdUserSchema;
export const transformArraySchema = createdUserSchema.array();
const updatePartial = createUserSchema.omit({
  id: z.number(),
  admin: true,
});
export const updateUserSchema = updatePartial;
export const updateUserShcemaToParse = updatePartial.partial();
