import { User } from '@/schema/user';

type SanitizedUser = Omit<User, 'password'>;

export function sanitizeUser(user: User): SanitizedUser {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}
