import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      user,
      message: 'User found',
    };
  }

  @Patch('/:email')
  async updateUser(
    @Param('email') email: string,
    @Body() userUpdateData: UpdateUserDTO,
  ) {
    const user = await this.userRepository.update(email, userUpdateData);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      updatedUser: user,
      message: 'User has been updated',
    };
  }

  @Delete('/:email')
  async deleteUser(@Param('email') email: string) {
    const user = await this.userRepository.delete(email);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      deletedUser: user,
      message: 'User has been deleted',
    };
  }
}
