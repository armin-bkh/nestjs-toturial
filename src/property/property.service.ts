import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from '../constants/db';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private property: Repository<Property>,
  ) {}
  async findAll(paginationDto: PaginationDto) {
    return await this.property.find({
      skip: paginationDto?.skip,
      take: paginationDto?.limit ?? DEFAULT_PAGE_SIZE,
    });
  }
  async findOne(id: number) {
    const property = await this.property.findOne({ where: { id } });
    if (!property) throw new NotFoundException();
    return property;
  }
  async create(property: CreatePropertyDto) {
    return await this.property.save(property);
  }
  async update(id: number, property: UpdatePropertyDto) {
    return await this.property.update({ id }, property);
  }
  async delete(id: number) {
    return await this.property.delete({ id });
  }
}
