import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(
    process.env.NODE_ENV,
    'in main.ts',
    process.env.APP_PORT,
    'app port',
  );
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
