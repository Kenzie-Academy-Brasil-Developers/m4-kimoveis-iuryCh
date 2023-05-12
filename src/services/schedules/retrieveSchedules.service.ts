import { Repository } from 'typeorm';
import { RealEstate } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';

export const listAllRealEstateSchedules = async (id: number) => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const getRealEstate: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: id,
    },
  });
  if (!getRealEstate) throw new AppError('RealEstate not found', 404);

  const realEstateFind: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: id,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  return realEstateFind;
};
