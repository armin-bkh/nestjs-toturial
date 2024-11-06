import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private property: Repository<Property>,
  ) {}
  async findAll() {
    return await this.property.find();
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
