import request from 'supertest';
import knex from '../db/knex';

import { createApp } from '../app';

const app = createApp();


describe('Provider API End-to-End Tests', () => {
  beforeAll(async () => {
    // Set up any necessary environment or database state before running tests
    knex('')
  });

  afterAll(async () => {
    // Clean up after running tests
  });

  it('should get all providers', async () => {
    const response = await request(app).get('/providers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([])); // Adjust as needed
  });

  it('should find one provider', async () => {
    const providerId = 'yourProviderId'; // Replace with a valid provider ID
    const response = await request(app).get(`/providers/${providerId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  it('should create a provider', async () => {
    const providerData = {
      // Provide valid provider data here
    };
    const response = await request(app).post('/providers').send(providerData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  // Add more tests for other functions

  // Example: Update provider
  it('should update a provider', async () => {
    const providerId = 'yourProviderId'; // Replace with a valid provider ID
    const updatedData = {
      // Provide valid updated data here
    };
    const response = await request(app)
      .put(`/providers/${providerId}`)
      .send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({})); // Adjust as needed
  });

  // Add more tests for other functions

  // Example: Delete provider
  it('should delete a provider', async () => {
    const providerId = 'yourProviderId'; // Replace with a valid provider ID
    const response = await request(app).delete(`/providers/${providerId}`);
    expect(response.status).toBe(204);
  });

  // Add more tests for other functions
});
