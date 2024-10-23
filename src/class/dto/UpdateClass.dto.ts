import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookExists } from '../validation/book-exists.validator';
import { UserExists } from '../validation/student-exists.validator';

export class UpdateClassDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Ano 1', 'Ano 2', 'Ano 3'])
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
  bookIds: string[];
}
