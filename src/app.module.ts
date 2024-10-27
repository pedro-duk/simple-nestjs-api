import { Module } from '@nestjs/common';
import { UserModule } from './entities/user/user.module';
import { BookModule } from './entities/book/book.module';
import { ClassModule } from './entities/class/class.module';

@Module({
  imports: [UserModule, BookModule, ClassModule],
})
export class AppModule {}
