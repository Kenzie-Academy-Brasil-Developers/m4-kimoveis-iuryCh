import { Request, Response } from 'express';
import { createScheduleService } from '../services/schedules/createSchedules.service';
import { listAllRealEstateSchedules } from '../services/schedules/retrieveSchedules.service';

export const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload = req.body;
  const userId = res.locals.id;

  const schedule = await createScheduleService(payload, userId);

  return res.status(201).json(schedule);
};

export const retrieveSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = res.locals.id;
  const schedules = await listAllRealEstateSchedules(id);

  return res.json(schedules);
};
