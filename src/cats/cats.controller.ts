import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cats.type';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return `cats route return STATUS:`;
  }

  @Get('get-ab*cd')
  findBy(): string {
    return `cat found`;
  }

  @Post()
  createRecord(@Body() createCatDto: CreateCatDto): Cat {
    console.log(createCatDto);
    return {
      id: Date.now().toString(),
      ...createCatDto,
    };
  }

  @Get(':id')
  findById(@Param('id') id: string): string {
    return `cat ID: ${id} found`;
  }
}
