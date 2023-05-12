import { z } from 'zod';
import { createLoginSchema } from '../schemas/login.schema';

export type TLoginRequest = z.infer<typeof createLoginSchema>;
