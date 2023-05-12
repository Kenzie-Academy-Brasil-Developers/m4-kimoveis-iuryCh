import { Request, Response } from 'express';
import { createUserService } from '../services/users/createUser.service';
import { readUsersService } from '../services/users/readUsers.service';
import { deleteUserService } from '../services/users/deleteUser.service';
import { updateUserService } from '../services/users/updateUsers.service';

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(newUser);
};

export const readUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsers = await readUsersService();

  return res.json(allUsers);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);
  const payload = req.body;
  const updatedUser = await updateUserService(userId, payload);
  return res.json(updatedUser);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = Number(req.params.id);
  await deleteUserService(userId);

  return res.status(204).send();
};
