import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  @IsEmpty({ groups: ['update'] })
  passportId: string;
}
