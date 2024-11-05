import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const id = parseInt(value, 10);
    if (isNaN(id)) throw new BadRequestException('id param must be number');
    if (id <= 0)
      throw new BadRequestException('id param should be positive number');
    return id;
  }
}
