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
@ValidatorConstraint({ name: 'bookExists', async: true })
export class BookExistsValidator implements ValidatorConstraintInterface {
  constructor(private bookRepository: BookRepository) {}

  async validate(value: any): Promise<boolean> {
    const book = await this.bookRepository.findByInternalId(value);

    return !!book;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} is not an existing Book Id`;
  }
}

export const BookExists = (validationOptions?: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: BookExistsValidator,
    });
  };
};
