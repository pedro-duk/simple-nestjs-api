import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../entities/user/user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(value);

    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return `The email ${args.value} is already vinculated to an account`;
  }
}

export const UniqueEmail = (validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
