import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { BookRepository } from '../entities/book/book.repository';

@Injectable()
@ValidatorConstraint({ name: 'bookNotRegistered', async: true })
export class BookNotRegisteredValidator
  implements ValidatorConstraintInterface
{
  constructor(private bookRepository: BookRepository) {}

  async validate(value: any): Promise<boolean> {
    const book = await this.bookRepository.findByInternalId(value);

    return !book;
  }

  defaultMessage(args: ValidationArguments) {
    return `There's already a book registered under the internal id ${args.value}`;
  }
}

export const BookNotRegistered = (validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: BookNotRegisteredValidator,
    });
  };
};
