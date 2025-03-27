import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import knex from '../db';
import {
  Registeration,
  User,
  loginUserType,
  omittedUser,
} from '../schema/response';
import { DomainErrror } from '../utils/error';

export async function getAll(): Promise<User[]> {
  const users = await knex('users').select('*');
  return users;
}

export async function getById(id: string): Promise<User[]> {
  const user = await knex('users').select('*').where({ user_id: id });
  return user[0];
}
export async function getByEmail(email: string): Promise<User[]> {
  const user = await knex('users').select('*').where({ email });
  return user;
}

export async function create(user: Registeration): Promise<omittedUser[]> {
  try {
    const saltWorkFactor = 10;
    const salt = bcrypt.genSaltSync(saltWorkFactor);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const encryptedUser = {
      email: user.email,
      password: hashedPassword,
      date_of_birth: user.date_of_birth,
    };

    const [newUser] = await knex('users').insert(encryptedUser).returning('*');
    const userWithoutPassword = removePassword<omittedUser[]>(newUser);
    return userWithoutPassword;
  } catch (error: any) {
    throw DomainErrror.internalError(error.message);
  }
}

export function assertUserExist(user: User | undefined): User {
  if (user === undefined) {
    throw DomainErrror.notFound(['user does not exist']);
  }
  return user as User;
}

export function compareAccounts(user: User | undefined): User {
  if (user === undefined) {
    throw DomainErrror.notFound(['user does not exist']);
  }
  return user as User;
}

export async function validatePassword({
  email,
  password,
}: loginUserType): Promise<omittedUser | string> {
  const foundUser = await getByEmail(email);

  if (!foundUser || !foundUser.length) {
    return 'No account exists for this user';
  }

  const isValidPassword = await bcrypt.compare(
    password,
    foundUser[0]?.password
  );

  if (!isValidPassword) {
    return 'Invalid username or password';
  }

  const newUser = removePassword(foundUser);
  return newUser[0];
}

export function removePassword<T extends Record<string, any>>(
  user: T
): Omit<T, 'password'> {
  return omit(user, ['password']);
}
