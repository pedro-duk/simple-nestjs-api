import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { ClassRepository } from '../entities/class/class.repository';

@Injectable()
@ValidatorConstraint({ name: 'classNotRegistered', async: true })
export class ClassNotRegisteredValidator
  implements ValidatorConstraintInterface
{
  constructor(private classRepository: ClassRepository) {}

  async validate(value: any): Promise<boolean> {
    const schoolClass = await this.classRepository.findByInternalId(value);

    return !schoolClass;
  }

  defaultMessage(args: ValidationArguments) {
    return `There's already a class registered under the internal id ${args.value}`;
  }
}

export const ClassNotRegistered = (validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: ClassNotRegisteredValidator,
    });
  };
};
