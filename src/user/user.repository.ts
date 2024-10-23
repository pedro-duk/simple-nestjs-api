import { Injectable } from '@nestjs/common';
import User, { IUser } from './user.entity';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UserRepository {
  async save(userData: CreateUserDTO) {
    const newUser = new User(userData);
    await newUser.save();
  }

  async findByEmail(email: string) {
    return await User.findOne({ email }).exec();
  }

  async findById(userId: string) {
    return await User.findById(userId).exec();
  }

  async update(userId: string, userUpdateData: Partial<IUser>) {
    return await User.findOneAndUpdate({ _id: userId }, userUpdateData, {
      new: true,
    });
  }

  async delete(userId: string) {
    return await User.findByIdAndDelete(userId);
  }

  async findAll() {
    return await User.find({})
  }
}
