import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { BookExistsValidator } from 'src/validators/book-exists.validator';
import { UserExistsValidator } from 'src/validators/user-exists.validator';
import { BookRepository } from 'src/entities/book/book.repository';
import { UserRepository } from 'src/entities/user/user.repository';

@Module({
  controllers: [ClassController],
  providers: [
    ClassRepository,
    BookExistsValidator,
    UserExistsValidator,
    UserRepository,
    BookRepository,
  ],
})
export class ClassModule {}
