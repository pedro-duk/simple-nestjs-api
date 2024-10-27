import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const user = await this.userRepository.save(userData);

    return {
      user,
      message: 'User saved successfully',
    };
  }

  @Get()
  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return {
      users,
      message: 'Users recovered',
    };
  }

  @Get('/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userRepository.findByEmail(email);

    return {
      user,
      message: 'User found',
    };
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateData: UpdateUserDTO,
  ) {
    const user = await this.userRepository.update(id, userUpdateData);

    return {
      updatedUser: user,
      message: 'User has been updated',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userRepository.delete(id);

    return {
      deletedUser: user,
      message: 'User has been deleted',
    };
  }
}
