import knex, { Knex } from 'knex';
import request from 'supertest';
import { test } from '../../knexfile.js';
import { createApp } from '../app';

const app = createApp();
let testDb: Knex<any, unknown[]>;

describe('User registration', () => {
  beforeAll(async () => {
    testDb = knex(test);
    await testDb.migrate.latest();
    // await testDb.seed.run();
  });

  afterAll(async () => {
    await testDb.migrate.rollback();
    await testDb.destroy();
  });

  it('should register a user', async () => {
    const userData = {
      email: 'user1@gmail.com',
      date_of_birth: '01/13/2076',
      password: 'passwordi',
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      data: {
        message: 'Account created successfully',
      },
    });
  });

  it('should return a 400 email validation error', async () => {
    const userData = {
      email: 'emeka121gmail.com',
      date_of_birth: '13-01-2028',
      password: 'ookli',
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: '"Invalid email, Invalid date format"',
    });
  });

  it('should return a 400 date validation error', async () => {
    const userData = {
      email: 'emeka121gmail.com',
      date_of_birth: '13-01-2028324354657688dfhgjh',
      password: 'ookli',
    };
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: '"Invalid email, Invalid date format"',
    });
  });

  // LOGIN

  describe('User Authentication', () => {
    describe('Get the login route', () => {
      describe('Given a successful login', () => {
        it('Should return a status code 200 and accessToken', async () => {
          const email = 'user1@gmail.com';
          const password = 'passwordi';
          const response = await request(app)
            .post('/api/auth/login')
            .send({ email, password });
          expect(response.status).toBe(200);
          expect(response.body.data.accessToken).toBeDefined();
        });
      });

      describe('Given that a user does not exist', () => {
        it('Should return a 404', async () => {
          const email = 'use@example.com';
          const password = 'passwor';

          const response = await request(app)
            .post('/api/auth/login')
            .send({ email, password });

          expect(response.status).toBe(401);
          expect(response.body.message).toBeDefined();
        });
      });

      describe('Given incorrect email or password', () => {
        it('Should return a 401', async () => {
          const email = 'user1@example.com';
          const password = 'incorrectPassword';

          const response = await request(app)
            .post('/api/auth/login')
            .send({ email, password });

          expect(response.status).toBe(401);
          // expect(response.body.data.message).toBeDefined();
          expect(response.body).toEqual({ message: expect.any(String) });
        });
      });
    });
  });
});
