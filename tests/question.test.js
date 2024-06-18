const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models'); 
let server;
let token;
let questionId; 

beforeAll(async () => {
  // Create a user and get the token
  await sequelize.sync({ force: true });
  server = app.listen(4000);

  const res = await request(app)
    .post('/api/user')
    .send({
      email: 'test123@example.com',
      password: 'password123'
    });

  token = res?._body?.token?.accessToken;
});

afterAll(async () => {
  await sequelize.close();
  server.close();
});


describe('Question API', () => {
  test('should create a new question', async () => {
    const res = await request(app)
      .post('/api/question')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'What is the capital of France?'
      });

    expect(res?.statusCode).toEqual(201);
    expect(res?._body).toHaveProperty('botResponse');
     questionId = res?._body?.question?.id;
  });


  test('should get a specific question', async () => {
    const response = await request(app)
      .get(`/api/question/${questionId}`)
    
    expect(response.statusCode).toEqual(200);
    expect(response._body).toHaveProperty('question');
  });

});
