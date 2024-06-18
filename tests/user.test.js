const request = require('supertest');
const app = require('../index'); 
const { sequelize } = require('../models');
let userId ; 

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  
  test('should create a new user', async () => {
    
    const res = await request(app)
      .post('/api/user')
      .send({
        email: 'childrenij233444@gmail.com',
        password: '12345678'
      });

    expect(res.statusCode).toEqual(201);
    expect(res._body.user).toHaveProperty('email','childrenij233444@gmail.com');
    userId = res._body.user.id;
  });


  test('should get user profile', async () => {
    const res = await request(app)
      .get(`/api/user/${userId}`)
    
    expect(res.statusCode).toEqual(200);
    expect(res._body).toHaveProperty('id', `${userId}`);
  });


  test('should get all questions asked by the user', async () => {
    const res = await request(app)
      .get(`/api/user/${userId}/questions`)
    
    expect(res.statusCode).toEqual(200);
    expect(res._body).toBeInstanceOf(Array);
  });
});
