import { User } from '../schema/response';

type SanitizedUser = Omit<User, 'password'>;

export function sanitizeUser(user: User): SanitizedUser {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}
