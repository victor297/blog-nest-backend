import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;
}