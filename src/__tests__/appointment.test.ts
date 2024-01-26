import knex, { Knex } from 'knex';
import request from 'supertest';
import { test } from '../../knexfile.js';

let testDb: Knex<any, unknown[]>;

import { createApp } from '../app';

const app = createApp();

describe('Appointment Scheduling', () => {
  beforeAll(async () => {
    testDb = knex(test);
    await testDb.migrate.latest();
    // await testDb.seed.run();
  });

  afterAll(async () => {
    await testDb.migrate.rollback();
    await testDb.destroy();
  });

  describe('As an authenticated user', () => {
    const validToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJkYXRlX29mX2JpcnRoIjoiMTk5MC0wMS0wMSIsImNyZWF0ZWRfYXQiOiIyMDI0LTAxLTI2VDEyOjQwOjM2LjYzMFoifSwiaWF0IjoxNzA2MjgwMzE5LCJleHAiOjE3MDYyOTQ3MTl9.Uc40FeVesSuhA4ud80W4p9uiq_-ujoFob90nMfVqG_iJetHbCANyqiL-WI_SXMktoq40GsLz3YRoZJyHGdzDP9frEyoDfdnDDjKMxGgzJ2SsFm24QvZxr2kjPsrXfF80iv1e06ehtG-WXI-S3bFMoG-sJ3PCHAc94wwV7-e0Tc9YMOEnZI6A5nyG_LgEbVmjC91n-B14eN_MKok7eAM1LHFpZCM-FUr5I4pFqc5PjSGaPdZ46M0vm-aXXRGeozsorTYgzVFOitotxqCuznFTmzp1hHDStMA-uLiltUNXFaW3gyr3-xSi5g7_1VOwz4ZgY3GugC-UWwTOYZV-eFaWzg';

    it('should get all appointments', async () => {
      const response = await request(app)
        .get('/api/appointments')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.results).toBeDefined();
      expect(response.body.data.results.length).toBeGreaterThan(1);
    });

    it('should find one appointment', async () => {
      const appointmentId = 1;
      const response = await request(app)
        .get(`/api/appointments`)
        .set('Authorization', `Bearer ${validToken}`)
        .query({ appointmentId });
      expect(response.status).toBe(200);
      expect(response.body.data.results).toBeDefined();
      expect(response.body.data.results.length).toBe(1);
    });

    it('should book a appointment', async () => {
      const appointmentData = {
        provider_id: 1,
        user_id: 1,
        start_time: '2025-04-03',
        end_time: '2025-05-20',
        reason_for_visit: ['Follow-up on recent blood test results'],
        remark: 'Needs interpreter during appointment (Spanish)',
      };
      const response = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${validToken}`)
        .send(appointmentData);
      expect(response.status).toBe(201);
      expect(response.body.data.results).toBeDefined();
    });

    it('Should return a 403 status code', async () => {
      const response = await request(app).get(`/api/appointments/`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBeDefined();
    });
  });
});
