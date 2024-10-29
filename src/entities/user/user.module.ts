import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UniqueEmailValidator } from '../../validators/unique-email.validator';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UniqueEmailValidator, UserService],
})
export class UserModule {}
