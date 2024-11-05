import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class HeadersDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Expose({ name: 'access-token' })
  accessToken: string;
}
