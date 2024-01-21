'use strict';
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.util';
import { ResponseBuilder } from '../utils/responseBuilder';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  ) as string;

  if (!accessToken) {
    return ResponseBuilder.failure(res, 403, 'You are not authorized!!!');
  }

  const { decoded } = verifyJwt({ accessToken });

  if (!decoded || typeof decoded !== 'object') {
    return ResponseBuilder.failure(res, 401, 'Please login to continue!!!');
  }

  req.user = decoded;

  return next();
};
