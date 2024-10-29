import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserDTO) {
    const user = await this.userRepository.save(userData);

    return {
      user,
      message: 'User saved successfully',
    };
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return {
      users,
      message: 'Users recovered',
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      user,
      message: 'User found',
    };
  }

  async updateUser(email: string, userUpdateData: UpdateUserDTO) {
    const user = await this.userRepository.update(email, userUpdateData);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return {
      updatedUser: user,
      message: 'User has been updated',
    };
  }

  async deleteUser(email: string) {
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
