import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import User from './user.entity';
import { UserRepository } from './user.repository';
import connectToMongo from '../../utils/connectToMongo';
import { Test } from '@nestjs/testing';

jest.mock('../../utils/connectToMongo', () => ({
  connectToMongo: async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri(), { dbName: 'testDB' });
  },
}));

describe('UserController', () => {
  // let userService: UserService;
  let userController: UserController;

  beforeAll(async () => {
    await connectToMongo();

    const newUser = new User({
      name: 'Usuario Teste',
      email: 'usuario@teste.com',
      password: '123456789',
      role: 'student',
    });
    await newUser.save();

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    // userService = moduleRef.get(UserService);
    userController = moduleRef.get(UserController);
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // const result = {
      //   users,
      //   message: 'Users recovered',
      // };
      // jest.spyOn(userService, 'getAllUsers').mockImplementation(() => result);

      const response = await userController.getAllUsers();

      expect(response.message).toBe('Users recovered');
    });
  });

  // describe('createBook', () => {
  //   it('should create and return a new User', async () => {
  //     const res = await userController.createUser({
  //       name: 'Usuario Teste',
  //       email: 'usuario@teste.com',
  //       password: '123456789',
  //       role: 'student',
  //     });

  //     expect(res.message).toBe(200);
  //   });
  // });
});
