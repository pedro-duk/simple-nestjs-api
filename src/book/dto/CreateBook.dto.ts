import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  url: string;
}