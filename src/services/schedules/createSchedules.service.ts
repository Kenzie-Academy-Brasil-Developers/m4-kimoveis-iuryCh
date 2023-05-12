import { Repository } from 'typeorm';
import { TScheduleRequest } from '../../interfaces/schedule.interface';
import { RealEstate, Schedule, User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';

export const createScheduleService = async (
  payload: TScheduleRequest,
  id: number
) => {
  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const findRealEstate: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: payload.realEstateId,
    },
  });

  if (!findRealEstate) throw new AppError('RealEstate not found', 404);

  const user: User | null = await userRepo.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const date = payload.date;
  const hour = payload.hour;
  const checkScheduleTime = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.realEstateId = :realEstateId', {
      realEstateId: payload.realEstateId,
    })
    .andWhere('schedule.date = :date', { date: payload.date })
    .andWhere('schedule.hour = :hour', { hour: payload.hour })
    .getOne();

  if (checkScheduleTime) {
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409
    );
  }
  const checkScheduleUser: Schedule | null = await scheduleRepo
    .createQueryBuilder('scheduleUser')
    .where('scheduleUser.date = :date', { date })
    .andWhere('scheduleUser.hour = :hour', { hour })
    .andWhere('scheduleUser.userId = :id', { id })
    .getOne();

  if (checkScheduleUser) {
    throw new AppError(
      'User schedule to this real estate at this date and time already exists',
      409
    );
  }

  const newSchedule: Schedule = scheduleRepo.create({
    ...payload,
    realEstate: findRealEstate,
    user: user,
  });

  await scheduleRepo.save(newSchedule);

  return { message: 'Schedule created' };
};
