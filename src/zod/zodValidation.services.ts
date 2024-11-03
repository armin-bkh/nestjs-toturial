import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      const errorMessage = e.issues.map(
        (issue) => `${issue.path[0]} is ${issue.message}`,
      );
      throw new BadRequestException(errorMessage);
    }
  }
}
