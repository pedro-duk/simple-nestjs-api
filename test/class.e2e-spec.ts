import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectToMongo } from '../src/utils/connectToMongo';
import { useContainer } from 'class-validator';
import User from '../src/entities/user/user.entity';
import Book from '../src/entities/book/book.entity';

jest.mock('../src/utils/connectToMongo', () => ({
  connectToMongo: async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri(), { dbName: 'testDB' });
  },
}));

describe('ClassController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await connectToMongo();

    const user = new User({
      name: 'Existing User',
      email: 'existinguser@mail.com',
      password: '123456789',
      role: 'student',
    });
    await user.save();

    const book = new Book({
      internalId: 'id0010',
      name: 'Existing Book',
      url: 'existingbookurl.com',
    });
    await book.save();

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

  describe('createClass', () => {
    it('should create and return a new Class', async () => {
      const res = await request(app.getHttpServer())
        .post('/class')
        .send({
          internalId: 'c0010',
          name: 'Test Class',
          grade: 'year 1',
          studentEmails: ['existinguser@mail.com'],
          bookInternalIds: ['id0010'],
        });

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.message).toBe('Class saved successfully');
      expect(res.body.class?.internalId).toBe('c0010');
      expect(res.body.class?.bookInternalIds).toContain('id0010');
      expect(res.body.class?.studentEmails).toContain('existinguser@mail.com');
    });

    it('should return Bad Request if class already exists', async () => {
      const res = await request(app.getHttpServer())
        .post('/class')
        .send({
          internalId: 'c0010',
          name: 'Test Class',
          grade: 'year 1',
          studentEmails: ['existinguser@mail.com'],
          bookInternalIds: ['id0010'],
        });

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toContain(
        "There's already a class registered under the internal id c0010",
      );
    });

    it("should return Bad Request if user doesn't exist", async () => {
      const res = await request(app.getHttpServer())
        .post('/class')
        .send({
          internalId: 'c0404',
          name: 'Test Class',
          grade: 'year 1',
          studentEmails: ['doesntexist@mail.com'],
          bookInternalIds: ['id0404'],
        });

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(res.body.message).toContain(
        'id0404 contains nonexistent Book Ids',
      );
      expect(res.body.message).toContain(
        'doesntexist@mail.com contains nonexistent user emails',
      );
    });
  });

  describe('createClass', () => {});
});
