import { BadRequestException, Injectable } from '@nestjs/common';
import { Cat } from './dto/interfaces/cats.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cat: Cat[] = [];

  findAll() {
    return this.cat;
  }

  findById(id: string) {
    const cat = this.cat.find((cat) => cat.id === id);
    if (!cat) throw new BadRequestException(`cat with ID:${id} not found`);
    return cat;
  }

  create(cat: CreateCatDto) {
    const newRecord = {
      id: Date.now().toString(),
      ...cat,
    };
    this.cat.push(newRecord);
    return newRecord;
  }
}
