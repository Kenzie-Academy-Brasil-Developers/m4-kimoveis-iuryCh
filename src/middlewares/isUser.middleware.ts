import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

export const isUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.locals.id !== Number(req.params.id)) {
    throw new AppError('Insufficient Permission', 403);
  }
  return next();
};
