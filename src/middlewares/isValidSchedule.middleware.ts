import { NextFunction, Request, Response } from 'express';
import { TScheduleRequest } from '../interfaces/schedule.interface';
import { Repository } from 'typeorm';
import { Schedule } from '../entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors';

export const verifyScheduleIsValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const scheduleData: TScheduleRequest = req.body;
  const userId = Number(res.locals.id);
  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const checkHour = scheduleData.hour.split(':')[0];
  if (Number(checkHour) < 8 || Number(checkHour) > 18)
    throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);
  //   console.log(scheduleData.hour.split(':')[0]);

  const weekDay = new Date(scheduleData.date);
  if (weekDay.getDay() === 0 || weekDay.getDay() === 6)
    throw new AppError('Invalid date, work days are monday to friday', 400);


    

  return next();
};