import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authToken: string | undefined = req.headers['authorization'];

  if (!authToken) throw new AppError('Missing bearer token', 401);

  const [_Bearer, token] = authToken.split(' ');

  jwt.verify(
    token,
    String(process.env.SECRET_KEY),
    (error: any, decoded: any) => {
      if (error) throw new AppError(error.message, 401);

      (res.locals.admin = decoded.admin), (res.locals.id = decoded.sub);
    }
  );

  return next();
};
