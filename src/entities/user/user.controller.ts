import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const response = await this.userService.createUser(userData);

    return response;
  }

  @Get()
  async getAllUsers() {
    const response = await this.userService.getAllUsers();

    return response;
  }

  @Get('/:email')
  async getUserByEmail(@Param('email') email: string) {
    const response = await this.userService.getUserByEmail(email);

    return response;
  }

  @Patch('/:email')
  async updateUser(
    @Param('email') email: string,
    @Body() userUpdateData: UpdateUserDTO,
  ) {
    const response = await this.userService.updateUser(email, userUpdateData);

    return response;
  }

  @Delete('/:email')
  async deleteUser(@Param('email') email: string) {
    const response = await this.userService.deleteUser(email);

    return response;
  }
}
