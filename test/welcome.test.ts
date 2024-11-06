
import app from '../app';
import request from 'supertest';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Welcome routes', () => {
  let expectedMessage = '';

  it('HEALTH CHECK', async () => {
    expectedMessage = 'Wellcome Lendsqr core service🚀🚀🛰🛰';
    const response = await request(app).get('/').send();
    
    expect(response.status).toBe(200);
    // expect(response.body.message).toBe(expectedMessage);
  });
});