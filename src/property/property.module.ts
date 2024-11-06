import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { APP_PIPE } from '@nestjs/core';
import { PropertyFeature } from '../entities/propertyFeature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyFeature])],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class PropertyModule {}
