import { User } from '@/schema/auth';

type SanitizedUser = Omit<User, 'password'>;

export function sanitizeUser(user: User): SanitizedUser {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}
