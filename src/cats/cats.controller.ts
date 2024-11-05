import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './dto/interfaces/cats.interface';
import { ValidationPipe } from '../validation/validation.services';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from '../auth/role.enum';

@Controller('cats')
@UseGuards(AuthGuard)
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
  @Roles([Role.Admin])
  createCat(@Body(new ValidationPipe()) createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Cat {
    return this.catsService.findById(id);
  }
}
