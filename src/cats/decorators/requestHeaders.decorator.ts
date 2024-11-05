import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const RequestHeaders = createParamDecorator(
  async (value, ctx: ExecutionContext) => {
    console.log(value, 'value is here dude look at this');
    const headers = ctx.switchToHttp().getRequest().headers;

    // Convert headers to DTO object
    const dto = plainToInstance(value, headers, {
      excludeExtraneousValues: true,
    });

    // Validate
    await validateOrReject(dto);

    return dto;
  },
);
