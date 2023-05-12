import { Repository } from 'typeorm';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { transformArraySchema } from '../../schemas/users.schema';

export const readUsersService = async () => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const searchedUsers: Array<User> = await usersRepo.find();

  const allUsers = transformArraySchema.parse(searchedUsers);

  return allUsers;
};
