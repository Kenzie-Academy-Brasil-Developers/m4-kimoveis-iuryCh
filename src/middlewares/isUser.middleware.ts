import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

export const isUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!res.locals.admin) {
    throw new AppError('Insufficient permission', 403);
  }
  return next();
};
