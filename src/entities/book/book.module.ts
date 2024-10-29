import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookNotRegisteredValidator } from 'src/validators/book-not-registered.validator';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  providers: [BookRepository, BookNotRegisteredValidator, BookService],
})
export class BookModule {}
