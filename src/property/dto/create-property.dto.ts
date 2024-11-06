import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;
  @IsInt()
  @IsDefined()
  @IsNotEmpty()
  price: number;
}
