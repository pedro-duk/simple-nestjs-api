import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { BookNotRegistered } from '../../../validators/book-not-registered.validator';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  @BookNotRegistered()
  internalId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  url: string;
}
