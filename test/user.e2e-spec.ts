import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectToMongo } from '../src/utils/connectToMongo';
import { useContainer } from 'class-validator';
import User from '../src/entities/user/user.entity';

jest.mock('../src/utils/connectToMongo', () => ({
  connectToMongo: async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri(), { dbName: 'testDB' });
  },
}));

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await connectToMongo();

    const newUser = new User({
      name: 'Existing User',
      email: 'existinguser@mail.com',
      password: '123456789',
      role: 'student',
    });
    await newUser.save();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  describe('createUser', () => {
    it('should create and return a new User', async () => {
      const res = await request(app.getHttpServer()).post('/user').send({
        name: 'Test User',
        email: 'testuser@mail.com',
        password: '123456789',
        role: 'student',
      });

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.message).toBe('User saved successfully');
      expect(res.body.user?.name).toBe('Test User');
      expect(res.body.user?.email).toBe('testuser@mail.com');
      expect(res.body.user?.role).toBe('student');
    });
  });

  describe('getUser', () => {
    it('should return testuser@mail.com without leaking password information', async () => {
      const res = await request(app.getHttpServer()).get(
        '/user/testuser@mail.com',
      );

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('User found');
      expect(res.body.user?.name).toBe('Test User');
      expect(res.body.user?.email).toBe('testuser@mail.com');
      expect(res.body.user?.role).toBe('student');
      expect(res.body.user?.password).toBeUndefined();
    });

    it('should return not found when searching for an inexistent user', async () => {
      const res = await request(app.getHttpServer()).get(
        '/user/doesntexist@email.com',
      );

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBe('User was not found');
    });
  });

  describe('updateUser', () => {
    it("should update testuser@mail.com's name to Test User Updated", async () => {
      const res = await request(app.getHttpServer())
        .patch('/user/testuser@mail.com')
        .send({ name: 'Test User Updated' });

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('User has been updated');
      expect(res.body.updatedUser?.name).toBe('Test User Updated');
    });
  });

  describe('getAllUsers', () => {
    it('should return testuser@mail.com and existinguser@mail.com without leaking password information', async () => {
      const res = await request(app.getHttpServer()).get('/user');
      const userEmails = res.body.users.map((user) => user.email);

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('Users recovered');
      expect(res.body.users.length).toBe(2);
      expect(userEmails).toContain('existinguser@mail.com');
      expect(userEmails).toContain('testuser@mail.com');
      expect(res.body.users[0].password).toBeUndefined();
      expect(res.body.users[1].password).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete testuser@mail.com', async () => {
      const res = await request(app.getHttpServer()).delete(
        '/user/testuser@mail.com',
      );

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('User has been deleted');
      expect(res.body.deletedUser.email).toBe('testuser@mail.com');
    });

    it('should return not found when deleting inexisting user', async () => {
      const res = await request(app.getHttpServer()).delete(
        '/user/doesntexist@mail.com',
      );

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBe('User was not found');
    });

    it('should return only existinguser@mail.com', async () => {
      const res = await request(app.getHttpServer()).get('/user');
      const userEmails = res.body.users.map((user) => user.email);

      expect(res.status).toBe(HttpStatus.OK);

      expect(res.body.message).toBe('Users recovered');
      expect(userEmails).toContain('existinguser@mail.com');
      expect(userEmails).not.toContain('testuser@mail.com');
    });
  });
});
