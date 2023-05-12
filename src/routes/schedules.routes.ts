import { Router } from 'express';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.midleware';
import {
  createSchedulesController,
  retrieveSchedulesController,
} from '../controllers/schedules.controller';
import { createScheduleSchema } from '../schemas/schedule.schema';
import { validateBodyMiddleware } from '../middlewares/validBody.middleware';
import { verifyScheduleIsValid } from '../middlewares/isValidSchedule.middleware';
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware';
import { isUserMiddleware } from '../middlewares/isUser.middleware';

export const scheduleRoutes = Router();

scheduleRoutes.post(
  '',
  verifyTokenMiddleware,
  validateBodyMiddleware(createScheduleSchema),
  verifyScheduleIsValid,
  createSchedulesController
);
scheduleRoutes.get(
  '/realEstate/:id',
  verifyTokenMiddleware,
  isAdminMiddleware,
  isUserMiddleware,
  retrieveSchedulesController
);
