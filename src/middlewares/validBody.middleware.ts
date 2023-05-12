import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const validate = schema.parse(req.body);
    req.body = validate;
   

    return next();
  };
