import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './dto/interfaces/cats.interface';
import { ZodValidationPipe } from '../zod/zodValidation.services';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get('get-ab*cd')
  findBy(): string {
    return `cat found`;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  createCat(@Body() createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Cat {
    return this.catsService.findById(id);
  }
}
