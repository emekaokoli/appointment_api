import request from 'supertest';
import knex from '../db/knex.js';

import { createApp } from '../app';

const app = createApp();

describe('Appointment API End-to-End Tests', () => {
  beforeAll(async () => {
    knex('');
  });

  afterAll(async () => {});

  it('should get all appointments', async () => {
    const response = await request(app).get('/appointments');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it('should find one appointment', async () => {
    const appointmentId = 1;
    const response = await request(app).get(`/appointments/${appointmentId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: {
          results: expect.arrayContaining([]),
        },
      })
    );
  });

  it('should create an appointment', async () => {
    const appointmentData = {
      provider_id: 1,
      user_id: 1,
      start_time: '2025-04-03',
      end_time: '2025-05-20',
      reason_for_visit: ['Follow-up on recent blood test results'],
      remark: 'Needs interpreter during appointment (Spanish)',
    };
    const response = await request(app)
      .post('/appointments')
      .send(appointmentData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: {
          results: 'Appointment created successfully',
        },
      })
    );
  });

  it('should update an appointment', async () => {
    const appointmentId = 1;
    const updatedData = {
      provider_id: 1,
      user_id: 1,
      start_time: '2025-04-03',
      end_time: '2025-05-20',
      reason_for_visit: ['Follow-up on all blood test results'],
      remark: 'Needs interpreter during appointment',
    };
    const response = await request(app)
      .put(`/appointments/${appointmentId}`)
      .send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        data: {
          results: 'Appointment updated successfully',
        },
      })
    );
  });
});
