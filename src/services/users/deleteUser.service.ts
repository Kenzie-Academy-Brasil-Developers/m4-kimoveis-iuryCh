import { Repository } from 'typeorm';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';

export const deleteUserService = async (userId: number): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const tookUser: User | null = await userRepo.findOneBy({
    id: userId,
  });

  await userRepo.softRemove(tookUser!);
};
