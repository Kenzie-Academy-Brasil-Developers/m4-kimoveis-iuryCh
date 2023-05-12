import { Repository } from 'typeorm';
import { TAllRealEstateResponse } from '../../interfaces/realEstate.interface';
import { RealEstate } from '../../entities';
import { AppDataSource } from '../../data-source';

export const listAllRealEstate = async (): Promise<TAllRealEstateResponse> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const AllRealState: Array<RealEstate> | null = await realEstateRepo.find({
    relations: {
      address: true,
    },
  });

  return AllRealState;
};
