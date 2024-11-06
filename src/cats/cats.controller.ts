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
// import { Cat } from './interfaces/cats.interface';
import { AuthGuard } from '../auth/auth.guard';
// import { ParseIdPipe } from './pips/parseId.pipe';
import { IdParamDto } from './dto/idParam.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeaders } from './decorators/requestHeaders.decorator';
import { UpdateCatDto } from './dto/update-cat.dto';
// import { Roles } from '../auth/role.decorator';
// import { Role } from '../auth/role.enum';

@Controller('cats')
@UseGuards(AuthGuard)
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
