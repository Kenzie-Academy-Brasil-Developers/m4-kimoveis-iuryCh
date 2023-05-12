import { z } from 'zod';
import { createAddressSchema } from '../schemas/address.schema';

export type TAddressObject = z.infer<typeof createAddressSchema>;
