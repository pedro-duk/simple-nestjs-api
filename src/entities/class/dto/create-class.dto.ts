import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumGrades } from '../../../enums/grade.enum';
import { BookExists } from '../../../validators/book-exists.validator';
import { ClassNotRegistered } from '../../../validators/class-not-registered.validator';
import { UserExists } from '../../../validators/user-exists.validator';

export class CreateClassDTO {
  @IsString()
  @IsNotEmpty()
  @ClassNotRegistered()
  internalId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EnumGrades)
  grade: string;

  @IsArray()
  @IsString({ each: true })
  @UserExists({ each: true })
  studentEmails: string[];

  @IsArray()
  @IsString({ each: true })
  @BookExists({ each: true })
  bookInternalIds: string[];
}
