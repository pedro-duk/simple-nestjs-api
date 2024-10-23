import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [UserModule, BookModule, ClassModule],
})
export class AppModule {}
