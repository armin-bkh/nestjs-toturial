import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cat } from './dto/interfaces/cats.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private cat: Cat[] = [];

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

  update(updateCatData: CreateCatDto, id: number) {
    const selectedCatIndex = this.cat.findIndex((cat) => cat.id === id);
    console.log(selectedCatIndex, 'index');
    if (selectedCatIndex === -1) {
      throw new HttpException(
        `cat with ID:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const cloneCat = [...this.cat];
    let selectedCat = cloneCat[selectedCatIndex];
    console.log(selectedCat, 'selected cat');
    selectedCat = {
      ...selectedCat,
      ...updateCatData,
      passportId: selectedCat.passportId,
    };
    console.log(selectedCat, 'here');
    cloneCat[selectedCatIndex] = selectedCat;
    this.cat = cloneCat;

    return selectedCat;
  }
}
