import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(
  OmitType(CreateCatDto, ['passportId']),
) {}
