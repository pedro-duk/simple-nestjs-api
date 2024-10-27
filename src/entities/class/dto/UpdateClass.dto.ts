import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumGrades } from 'src/enums/grade.enum';
import { BookExists } from 'src/validators/book-exists.validator';
import { UserExists } from 'src/validators/user-exists.validator';

export class UpdateClassDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EnumGrades)
  @IsOptional()
  grade: string;

  @IsArray()
  @IsString({ each: true })
  @UserExists({ each: true })
  @IsOptional()
  studentIds: string[];

  @IsArray()
  @IsString({ each: true })
  @BookExists({ each: true })
  @IsOptional()
  bookInternalIds: string[];
}
