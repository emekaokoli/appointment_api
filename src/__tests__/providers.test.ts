import knex, { Knex } from 'knex';
import request from 'supertest';
import db from '../../knexfile';
let testDb: Knex<any, unknown[]>;

import { createApp } from '../app';

const app = createApp();

describe('Provider ', () => {
  beforeAll(async () => {
    testDb = knex(db.test);
    await testDb.migrate.latest();
    // await testDb.seed.run();
  });

  afterAll(async () => {
    await testDb.migrate.rollback();
    await testDb.destroy();
  });

  describe('As an authenticated Provider', () => {
    const validToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJkYXRlX29mX2JpcnRoIjoiMTk5MC0wMS0wMSIsImNyZWF0ZWRfYXQiOiIyMDI0LTAxLTI2VDEyOjQwOjM2LjYzMFoifSwiaWF0IjoxNzA2MjgwMzE5LCJleHAiOjE3MDYyOTQ3MTl9.Uc40FeVesSuhA4ud80W4p9uiq_-ujoFob90nMfVqG_iJetHbCANyqiL-WI_SXMktoq40GsLz3YRoZJyHGdzDP9frEyoDfdnDDjKMxGgzJ2SsFm24QvZxr2kjPsrXfF80iv1e06ehtG-WXI-S3bFMoG-sJ3PCHAc94wwV7-e0Tc9YMOEnZI6A5nyG_LgEbVmjC91n-B14eN_MKok7eAM1LHFpZCM-FUr5I4pFqc5PjSGaPdZ46M0vm-aXXRGeozsorTYgzVFOitotxqCuznFTmzp1hHDStMA-uLiltUNXFaW3gyr3-xSi5g7_1VOwz4ZgY3GugC-UWwTOYZV-eFaWzg';

    it('should get all providers', async () => {
      const response = await request(app)
        .get('/api/providers')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body.data.results).toBeDefined();
    });

    it('should find one provider', async () => {
      const providerId = 1;
      const response = await request(app)
        .get(`/api/providers/`)
        .set('Authorization', `Bearer ${validToken}`)
        .query({ providerId });
      expect(response.status).toBe(200);
      expect(response.body.data.results).toBeDefined();
    });

    it('should create a provider', async () => {
      const providerData = {
        name: 'Dr Sarah tamkredi',
        bio: 'lorem ipsum dolor sit amet',
        title: 'Neurosurgeon',
      };
      const response = await request(app)
        .post('/api/providers')
        .set('Authorization', `Bearer ${validToken}`)
        .send(providerData);
      expect(response.status).toBe(201);
      expect(response.body.data.message).toBeDefined();
    });
  });
});
