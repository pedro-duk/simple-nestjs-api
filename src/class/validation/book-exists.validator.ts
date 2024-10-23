import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { BookRepository } from '../../book/book.repository';

@Injectable()
@ValidatorConstraint({async: true})
export class BookExistsValidator implements ValidatorConstraintInterface {
  constructor(private bookRepository: BookRepository){}

  async validate(value: any): Promise<boolean> {
    const book = await this.bookRepository.findById(value);

    return !!book;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} is not an existing Book Id`;
  }
}

export const BookExists = (validationOptions?: ValidationOptions) => {
  return(object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: BookExistsValidator,
    })
  }
}