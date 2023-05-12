import { z } from 'zod';
import {
  createUserSchema,
  createdUserSchema,
  updateUserSchema,
  updatedResturnSchema,
} from '../schemas/users.schema';
import { DeepPartial } from 'typeorm';


export type TUserRequest = z.infer<typeof createUserSchema>;
export type TUserResponse = z.infer<typeof createdUserSchema>;
type TUserToUpdate = z.infer<typeof updateUserSchema>;
export type TUserUpdateRequest = DeepPartial<TUserToUpdate>;
export type TUserUpdateReturn = z.infer<typeof updatedResturnSchema>;
