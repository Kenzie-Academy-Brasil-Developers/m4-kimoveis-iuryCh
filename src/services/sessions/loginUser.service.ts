import { TLoginRequest } from '../../interfaces/login.interface';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import 'dotenv/config';

export const createTokenService = async (
  payload: TLoginRequest
): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: payload.email,
  });
  if (!user) throw new AppError('Invalid credentials', 401);

  const passwordMatch = await compare(payload.password, user.password);

  if (!passwordMatch) throw new AppError('Invalid credentials', 401);

  const token: string = jwt.sign(
    { admin: user.admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: '24h',
      subject: String(user.id),
    }
  );

  return token;
};
