import { Repository } from 'typeorm';
import { User } from '../../entities';
import {
  TUserUpdateRequest,
  TUserUpdateReturn,
} from '../../interfaces/users.inteface';
import { AppDataSource } from '../../data-source';
import { updatedResturnSchema } from '../../schemas/users.schema';

export const updateUserService = async (
  id: number,
  payload: TUserUpdateRequest
): Promise<TUserUpdateReturn> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userToUpdate: User | null = await userRepo.findOne({
    where: {
      id: id
    }
  })

  const createUpdatedUser: User = userRepo.create({
    ...userToUpdate,
    ...payload,
  });

  const saveUpdatedUser: User = await userRepo.save(createUpdatedUser);

  const psrseUpdatedUser: TUserUpdateReturn =
    updatedResturnSchema.parse(saveUpdatedUser);

  return psrseUpdatedUser;
};
