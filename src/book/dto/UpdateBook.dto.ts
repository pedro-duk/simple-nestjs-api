import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  url: string;
}