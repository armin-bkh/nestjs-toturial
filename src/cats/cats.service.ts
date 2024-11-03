import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cat } from './dto/interfaces/cats.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cat: Cat[] = [];

  findAll() {
    return this.cat;
  }

  findById(id: number) {
    const cat = this.cat.find((cat) => cat.id === id);
    if (!cat)
      throw new HttpException(
        `cat with ID:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return cat;
  }

  create(cat: CreateCatDto) {
    const newRecord: Cat = {
      id: Date.now(),
      ...cat,
    };
    this.cat.push(newRecord);
    return newRecord;
  }
}
