import request from 'supertest';
import { createApp } from '../app';
import knex from '../db/knex';

const app = createApp();

describe('User API End-to-End Tests', () => {
  beforeAll(async () => {
    knex('');
  });

  afterAll(async () => {});

  it('should register a user', async () => {
    const userData = {
      email: 'emeka121@gmail.com',
      date_of_birth: '13-01-2028',
      password: 'ookli',
    };
    const response = await request(app).post('/users/register').send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  it('should login a user', async () => {
    const loginData = {};
    const response = await request(app).post('/users/login').send(loginData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it('should get user by ID', async () => {
    const userId = 'yourUserId';
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it('should get user by email', async () => {
    const userEmail = 'yourUserEmail@example.com';
    const response = await request(app).get(`/users/email/${userEmail}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });
});
