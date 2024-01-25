import request from 'supertest';
import bcrypt from 'bcrypt';
import knex from '../db/knex';
import { getAll, getById, getByEmail, create, assertUserExist, validatePassword, removePassword } from './yourUserModule'; t import { createApp } from '../app';

const app = createApp();

describe('User API End-to-End Tests', () => {
  beforeAll(async () => {
    // Set up any necessary environment or database state before running tests
  });

  afterAll(async () => {
    // Clean up after running tests
  });

  // User Registration Tests

  it('should register a user', async () => {
    const userData = {
      
    email:"emeka121@gmail.com",
    date_of_birth:"13-01-2028",
    password:"ookli"

    };
    const response = await request(app).post('/users/register').send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  // User Login Tests

  it('should login a user', async () => {
    const loginData = {
      // Provide valid user login data here
    };
    const response = await request(app).post('/users/login').send(loginData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  // Add more tests for other functions

  // Example: Get all users
  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([])); // Adjust as needed
  });

  // Example: Get user by ID
  it('should get user by ID', async () => {
    const userId = 'yourUserId'; // Replace with a valid user ID
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  // Example: Get user by email
  it('should get user by email', async () => {
    const userEmail = 'yourUserEmail@example.com'; // Replace with a valid user email
    const response = await request(app).get(`/users/email/${userEmail}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  // Add more tests for other functions
});
