import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async updateHashedRefreshToken(id: number, hashedRefreshToken: string) {
    return await this.userRepository.update({ id }, { hashedRefreshToken });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'role',
        'firstName',
        'lastName',
        'email',
        'avatarUrl',
        'hashedRefreshToken',
      ],
    });
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
