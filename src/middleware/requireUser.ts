import { NextFunction, Request, Response } from 'express';
import { ResponseBuilder } from '../utils/responseBuilder';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user; // Check user information on req.user

  if (!user) {
    return ResponseBuilder.failure(res, 403, 'User not authenticated');
  }

  return next();
};

export default requireUser;
