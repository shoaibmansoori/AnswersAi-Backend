const request = require('supertest');
const app = require('../index'); // Adjust the path to your app.js

let token;

beforeAll(async () => {
  // Create a user and get the token
  await request(app)
    .post('/api/users')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });

  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123'
    });

  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Question API', () => {
  test('should create a new question', async () => {
    const res = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'What is the capital of France?'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('question');
  });

  test('should get a specific question', async () => {
    const res = await request(app)
      .post('/api/questions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'What is the capital of Germany?'
      });

    const questionId = res.body.question.id;

    const response = await request(app)
      .get(`/api/questions/${questionId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('question');
  });

  test('should get all questions asked by the user', async () => {
    const res = await request(app)
      .get('/api/users/1/questions')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
