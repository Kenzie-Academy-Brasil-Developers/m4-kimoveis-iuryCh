import { Request, Response } from 'express';
import { createRealestateService } from '../services/realEstates/createRealEstate.service';
import { listAllRealEstate } from '../services/realEstates/retrieveRealState.service';

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload = req.body;

  const newRealEstate = await createRealestateService(payload);

  return res.status(201).json(newRealEstate);
};

export const listAllRealEstateController = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const allRealStates = await listAllRealEstate();

  return res.json(allRealStates);
};
