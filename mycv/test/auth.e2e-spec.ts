import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles signup', () => {
    const email = 'test99991999@email.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'letmein',
      })
      .expect(201)
      .then((res) => {
        const { id, email: returnedEmail } = res.body;
        expect(id).toBeDefined();
        expect(returnedEmail).toEqual(email);
      });
  });
});
