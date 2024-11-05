import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './dto/interfaces/cats.interface';
import { AuthGuard } from '../auth/auth.guard';
// import { Roles } from '../auth/role.decorator';
// import { Role } from '../auth/role.enum';

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
  // @Roles([Role.Admin])
  createCat(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        always: true,
        groups: ['create'],
      }),
    )
    createCatDto: CreateCatDto,
  ): Cat {
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  updateCat(
    @Body(
      new ValidationPipe({
        whitelist: false,
        forbidNonWhitelisted: true,
        always: true,
        groups: ['update'],
      }),
    )
    updateCatDto: CreateCatDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.catsService.update(updateCatDto, id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Cat {
    return this.catsService.findById(id);
  }
}
