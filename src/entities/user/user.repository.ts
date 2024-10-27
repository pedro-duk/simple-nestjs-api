import { Injectable } from '@nestjs/common';
import User, { IUser } from './user.entity';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserProjection } from './projections/user.projection';

@Injectable()
export class UserRepository {
  async save(userData: CreateUserDTO) {
    const newUser = new User(userData);
    await newUser.save();

    return await User.findOne(
      { email: userData.email },
      UserProjection.userBasicInfo(),
    ).exec();
  }

  async findByEmail(email: string) {
    return await User.findOne({ email }, UserProjection.userBasicInfo()).exec();
  }

  async update(email: string, userUpdateData: Partial<IUser>) {
    return await User.findOneAndUpdate({ email }, userUpdateData, {
      new: true,
      projection: UserProjection.userBasicInfo(),
    });
  }

  async delete(email: string) {
    return await User.findOneAndDelete(
      { email },
      {
        projection: UserProjection.userBasicInfo(),
      },
    );
  }

  async findAll() {
    return await User.find({}, UserProjection.userBasicInfo());
  }
}
