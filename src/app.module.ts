import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { LoggerMiddleware } from './cats/cats.middleware';
import dbConfigProduction from './config/db.config.production';
import { PropertyModule } from './property/property.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import dbConfigDevelopment from './config/db.config.development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
      load: [dbConfigDevelopment, dbConfigProduction],
    }),
    CatsModule,
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV === 'production'
          ? dbConfigProduction
          : dbConfigDevelopment,
    }),
    PropertyModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
