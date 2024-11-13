import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { IdParamDto } from './dto/idParam.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeaders } from './decorators/requestHeaders.decorator';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@UseGuards(RoleGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get('get-ab*cd')
  findBy(): string {
    return `cat found`;
  }

  @Post()
  // @Roles([Role.Admin])
  createCat(
    @Body()
    createCatDto: CreateCatDto,
    @RequestHeaders(
      new ValidationPipe({
        validateCustomDecorators: true,
      }),
    )
    headers: HeadersDto,
  ) {
    // return headers;
    console.log(headers);
    return this.catsService.create(createCatDto);
  }

  @Put(':id')
  updateCat(
    @Body()
    updateCatDto: UpdateCatDto,
    @Param()
    { id }: IdParamDto,
  ) {
    return this.catsService.update(updateCatDto, id);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.catsService.findById(id);
  }
}
