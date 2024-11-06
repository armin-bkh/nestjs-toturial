import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cat } from '../entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepo: Repository<Cat>) {}
  async findAll() {
    return await this.catRepo.find();
  }

  async findById(id: number) {
    const cat = await this.catRepo.findOne({
      where: { id },
    });
    if (!cat) {
      throw new NotFoundException();
    }
    return cat;
  }

  async create(cat: CreateCatDto) {
    return await this.catRepo.save(cat);
  }

  async update(cat: UpdateCatDto, id: number) {
    return await this.catRepo.update({ id }, cat);
  }
}
