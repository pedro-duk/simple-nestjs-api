import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UniqueEmail } from '../../../validators/unique-email.validator';
import { EnumRoles } from '../../../enums/role.enum';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsEmail()
  @UniqueEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsEnum(EnumRoles)
  @IsOptional()
  role?: string;
}
