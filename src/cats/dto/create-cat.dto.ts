import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  color: string;

  @IsString()
  @IsDefined()
  passportId: string;

  @IsInt()
  @IsOptional()
  price: number;
}
