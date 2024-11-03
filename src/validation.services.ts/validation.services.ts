import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

function convertErrors(errors: ValidationError[]) {
  return errors.map((error) => {
    const message = Object.values(error.constraints);
    const field = error.property;
    return {
      field,
      message,
    };
  });
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(convertErrors(errors));
    }

    return value;
  }

  private toValidate(metatype: ArgumentMetadata['metatype']): boolean {
    const types: ArgumentMetadata['metatype'][] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
