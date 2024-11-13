import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/types/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  avatarUrl: string;
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @OneToMany(() => Property, (property) => property.user, { cascade: true })
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedBy, { cascade: true })
  @JoinTable({ name: 'liked_properties' })
  likedProperties: Property[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
