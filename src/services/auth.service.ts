import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import knex from '../db/knex';
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
export async function getByEmail(email: string): Promise<User> {
  const user = await knex('users').select('*').where({ email });
  return user[0];
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
    console.trace(error.stack);
    
    throw DomainErrror.internalError(error.message);
  }
}

export function assertUserExist(user: User | undefined): User {
  if (user === undefined) {
    throw DomainErrror.notFound(['user does not exist']);
  }
  return user as User;
}

export async function validatePassword({
  email,
  password,
}: loginUserType): Promise<omittedUser[]> {
  const foundUser = await knex('users').select('*').where({ email });

  if (!foundUser || !foundUser[0]?.password) {
    throw new Error('Wrong email/password');
  }

  const isValidPassword = await bcrypt.compare(
    password,
    foundUser[0]?.password
  );

  if (!isValidPassword) {
    throw new Error('Wrong email/password');
  }

  return omit(foundUser, ['password']);
}

export function removePassword<T extends Record<string, any>>(
  user: T
): Omit<T, 'password'> {
  return omit(user, ['password']);
}
