import { z } from 'zod';
import {
  createRealEstateSchema,
  returnAllRealEstateSchema,
  returnRealEstateSchema,
} from '../schemas/realEstate.schema';


export type TRealEstateRequest = z.infer<typeof createRealEstateSchema>;
export type TRealEstateResponse = z.infer<typeof returnRealEstateSchema>;
export type TAllRealEstateResponse = z.infer<typeof returnAllRealEstateSchema>;
