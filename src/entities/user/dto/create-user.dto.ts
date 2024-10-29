import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UniqueEmail } from '../../../validators/unique-email.validator';
import { EnumRoles } from 'src/enums/role.enum';

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

  @IsEnum(EnumRoles)
  role: string;
}
