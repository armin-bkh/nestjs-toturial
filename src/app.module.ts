import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { LoggerMiddleware } from './cats/cats.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
