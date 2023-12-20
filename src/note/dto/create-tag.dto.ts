import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @Length(3, 50)
  short: string;

  @IsOptional()
  @Length(3, 20)
  color?: string;

  @IsOptional()
  @Length(3, 200)
  message?: string;
}
