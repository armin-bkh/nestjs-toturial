import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @Get()
  findAll() {
    return this.propertyService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }
  @Post()
  create(@Body() property: CreatePropertyDto) {
    return this.propertyService.create(property);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() property: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, property);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.delete(id);
  }
}
