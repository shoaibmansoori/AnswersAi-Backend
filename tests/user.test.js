const request = require('supertest');
const app = require('../index'); // Adjust the path to your app.js
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  let token;
  
  test('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  test('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });
});
