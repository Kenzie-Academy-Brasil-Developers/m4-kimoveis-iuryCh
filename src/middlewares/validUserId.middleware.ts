import { Repository } from 'typeorm';
import { User } from '../entities';
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors';

export const VerifyUserIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    id: Number(req.params.id),
  });

  if (!user) throw new AppError('User not found', 404);

  res.locals.user = user;

  return next();
};
