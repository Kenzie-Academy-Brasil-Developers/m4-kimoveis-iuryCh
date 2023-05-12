import { Request, Response } from 'express';
import { createTokenService } from '../services/sessions/loginUser.service';

export const createTokenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const login = req.body;
  const token: string = await createTokenService(login);

  return res.json({ token });
};
