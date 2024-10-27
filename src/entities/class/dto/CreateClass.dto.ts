import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumGrades } from 'src/enums/grade.enum';
import { BookExists } from 'src/validators/book-exists.validator';
import { UserExists } from 'src/validators/user-exists.validator';

export class CreateClassDTO {
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
