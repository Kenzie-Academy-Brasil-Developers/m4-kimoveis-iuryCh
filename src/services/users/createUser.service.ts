import { Repository } from 'typeorm';
import { TUserRequest, TUserResponse } from '../../interfaces/users.inteface';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { createdUserSchema } from '../../schemas/users.schema';

export const createUserService = async (
  payload: TUserRequest
): Promise<TUserResponse> => {
  const userRespo: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRespo.create(payload);

  await userRespo.save(user);

  const userNoPWD: TUserResponse = createdUserSchema.parse(user);

  return userNoPWD;
};
