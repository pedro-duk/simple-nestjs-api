import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { BookModule } from './entities/book/book.module';
import { ClassModule } from './entities/class/class.module';
import { BookNotRegisteredValidator } from './validators/book-not-registered.validator';

@Module({
  imports: [UserModule, BookModule, ClassModule, BookNotRegisteredValidator],
})
export class AppModule {}
