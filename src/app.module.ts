import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { LoggerMiddleware } from './cats/cats.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgConfig } from './database/pg.config';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [CatsModule, TypeOrmModule.forRoot(PgConfig), PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
