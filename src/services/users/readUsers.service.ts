import { Repository } from 'typeorm';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { transformArraySchema } from '../../schemas/users.schema';
import { TUserResponse } from '../../interfaces/users.inteface';

export const readUsersService = async (): Promise<Array<TUserResponse>> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const foundedUsers: Array<User> | null = await usersRepo.find();

  const allUsers = transformArraySchema.parse(foundedUsers);

  return allUsers;
};
