import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ResponseBuilder } from '../utils/responseBuilder';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessage = parseZodErrorMessage(error);
        return ResponseBuilder.failure(res, 400, errorMessage);
      } else {
        return ResponseBuilder.failure(res, 400, error?.message);
      }
    }
  };

function parseZodErrorMessage(error: ZodError): string {
  const errorDetails = error.errors.map((e) => ({
    validation: e.path.join('.'),
    code: e.code,
    message: e.message,
  }));

  const errorMessage = errorDetails.map((e) => e.message).join(', ');

  return JSON.stringify(errorMessage);
}