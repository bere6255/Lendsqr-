
import app from '../app';
import request from 'supertest';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Register routes', () => {
  let expectedMessage = '';

  it('HEALTH CHECK', async () => {
    expectedMessage = 'Registration successful';
    const response = await request(app).post('/auth/register').send({
      firstName: "John",
      lastName: "Deo",
      email: `Johndeo@email.com`,
      password: `123456789`
    });

    expect(response.status).toBe(200);
    // expect(response.body.message).toBe(expectedMessage);
  });
});