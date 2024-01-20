import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { ResponseBuilder } from '../utils/responseBuilder';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error: any) {
      if (error) {
        return ResponseBuilder.failure(res, 400, error?.message);
      }
      next();
    }
  };
