import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UniqueEmail } from '../validation/unique-email.validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @UniqueEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['Aluno', 'Professor'])
  role: string;
}
