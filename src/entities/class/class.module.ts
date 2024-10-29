import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassRepository } from './class.repository';
import { BookExistsValidator } from 'src/validators/book-exists.validator';
import { UserExistsValidator } from 'src/validators/user-exists.validator';
import { BookRepository } from 'src/entities/book/book.repository';
import { UserRepository } from 'src/entities/user/user.repository';
import { ClassNotRegisteredValidator } from 'src/validators/class-not-registered.validator';
import { ClassService } from './class.service';

@Module({
  controllers: [ClassController],
  providers: [
    ClassRepository,
    UserRepository,
    BookRepository,
    BookExistsValidator,
    UserExistsValidator,
    ClassNotRegisteredValidator,
    ClassService,
  ],
})
export class ClassModule {}
