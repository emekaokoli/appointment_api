import { User } from '@/schema/auth';
import { type Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

declare global {
  namespace Express {
    interface Request {
      user?: User | JwtPayload;
    }
  }
}
