import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { BookExists } from '../validation/book-exists.validator';
import { UserExists } from '../validation/student-exists.validator';

export class CreateClassDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Ano 1', 'Ano 2', 'Ano 3'])
  grade: string;

  @IsArray()
  @IsString({ each: true })
  @UserExists({ each: true })
  studentIds: string[];

  @IsArray()
  @IsString({ each: true })
  @BookExists({ each: true })
  bookIds: string[];
}
