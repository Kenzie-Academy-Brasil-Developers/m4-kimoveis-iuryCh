import { z } from 'zod';
import { createScheduleSchema } from '../schemas/schedule.schema';

export type TScheduleRequest = z.infer<typeof createScheduleSchema>;
