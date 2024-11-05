import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectToMongo } from '../src/utils/connectToMongo';
import { useContainer } from 'class-validator';
import Book from '../src/entities/book/book.entity';

jest.mock('../src/utils/connectToMongo', () => ({
  connectToMongo: async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri(), { dbName: 'testDB' });
  },
}));

describe('BookController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await connectToMongo();

    const newBook = new Book({
      internalId: 'id0010',
      name: 'Existing Book',
      url: 'existingbookurl.com',
    });
    await newBook.save();

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

  describe('createBook', () => {
    it('should create and return a new Book', async () => {
      const res = await request(app.getHttpServer()).post('/book').send({
        internalId: 'id0001',
        name: 'Test Book',
        url: 'testurl.com',
      });

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.message).toBe('Book saved successfully');
      expect(res.body.book?.internalId).toBe('id0001');
      expect(res.body.book?.name).toBe('Test Book');
      expect(res.body.book?.url).toBe('testurl.com');
    });
  });

  describe('getBook', () => {
    it('should get book id0001', async () => {
      const res = await request(app.getHttpServer()).get('/book/id0001');

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('Book found');
      expect(res.body.book?.internalId).toBe('id0001');
      expect(res.body.book?.name).toBe('Test Book');
      expect(res.body.book?.url).toBe('testurl.com');
    });

    it('should return not found when searching for an inexistent book', async () => {
      const res = await request(app.getHttpServer()).get('/book/id0044');

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBe('Book was not found');
    });
  });

  describe('updateBook', () => {
    it("should update id0001's name to Test Book Updated", async () => {
      const res = await request(app.getHttpServer())
        .patch('/book/id0001')
        .send({ name: 'Test Book Updated' });

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('Book has been updated');
      expect(res.body.updatedBook?.name).toBe('Test Book Updated');
    });
  });

  describe('getAllBooks', () => {
    it('should return books id0001 and id0010', async () => {
      const res = await request(app.getHttpServer()).get('/book');
      const bookIds = res.body.books.map((book) => book.internalId);

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('Books recovered');
      expect(res.body.books.length).toBe(2);
      expect(bookIds).toContain('id0001');
      expect(bookIds).toContain('id0010');
    });
  });

  describe('deleteBook', () => {
    it('should delete book id0001', async () => {
      const res = await request(app.getHttpServer()).delete('/book/id0001');

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.message).toBe('Book has been deleted');
      expect(res.body.deletedBook.internalId).toBe('id0001');
    });

    it('should return not found when deleting inexisting book', async () => {
      const res = await request(app.getHttpServer()).delete('/book/id0044');

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBe('Book was not found');
    });

    it('should return only id0010', async () => {
      const res = await request(app.getHttpServer()).get('/book');
      const bookIds = res.body.books.map((book) => book.internalId);

      expect(res.status).toBe(HttpStatus.OK);

      expect(res.body.message).toBe('Books recovered');
      expect(bookIds).toContain('id0010');
      expect(bookIds).not.toContain('id0001');
    });
  });
});
