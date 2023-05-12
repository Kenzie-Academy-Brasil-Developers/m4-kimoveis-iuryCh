import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.locals.admin) {
    console.log(res.locals.admin);
    return next();
  } else if (Number(res.locals.id) !== Number(req.params.id)) {
    throw new AppError('Insufficient permission', 403);
  }
  return next();
};
