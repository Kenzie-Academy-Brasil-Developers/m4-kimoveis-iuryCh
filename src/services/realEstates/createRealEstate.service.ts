import { Repository } from 'typeorm';
import {
  TRealEstateRequest,
  TRealEstateResponse,
} from '../../interfaces/realEstate.interface';
import { Address, Category, RealEstate } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import { TAddressObject } from '../../interfaces/address.interface';

export const createRealestateService = async (
  payload: TRealEstateRequest
): Promise<TRealEstateResponse> => {
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const address: TAddressObject = payload.address;
  const addressExist: Address | null = await addressRepo.findOne({
    where: {
      street: address.street,
      zipCode: address.zipCode,
      number: address.number!,
      city: address.city,
      state: address.state,
    },
  });

  if (addressExist) throw new AppError('Address already exists', 409);

  const category: Category | null = await categoryRepo.findOne({
    where: {
      id: payload.categoryId,
    },
  });
  if (!category) throw new AppError('Category not found', 404);

  const newAddress: Address = addressRepo.create({ ...payload.address });
  await addressRepo.save(newAddress);

  const realEstate: RealEstate = realEstateRepo.create({
    ...payload,
    address: newAddress,
    category: category,
  });
  await realEstateRepo.save(realEstate);

  return realEstate;
};
