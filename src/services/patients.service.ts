import bcrypt from 'bcrypt';
import knex from '../db/knex';
import { CreateUser, User } from '../schema/user';
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
  return user[0];
}

export async function create(user: CreateUser): Promise<CreateUser> {
  //encrypts the password with bcrypt before saving
  const saltWorkFactor = 10;
  const salt = bcrypt.genSaltSync(saltWorkFactor);
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  const encryptedUser = {
    email: user.email,
    password: hashedPassword,
    date_of_birth: user.date_of_birth,
  };

  const newUser = await knex('users').insert(encryptedUser).returning('*');
  return newUser[0];
}

export function assertUserExist(user: User | undefined): User {
  if (user === undefined) {
    throw DomainErrror.notFound(['user does not exist']);
  }

  return user as User;
}
