import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { BookExistsValidator } from './validation/book-exists.validator';
import { UserExistsValidator } from './validation/student-exists.validator';
import { BookRepository } from 'src/book/book.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [ClassController],
  providers: [ClassRepository, BookExistsValidator, UserExistsValidator, UserRepository, BookRepository],
})
export class ClassModule {}
