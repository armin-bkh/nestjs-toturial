import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'dbConfig.development',
  (): PostgresConnectionOptions => ({
    url: process.env.DB_URL,
    port: +process.env.DB_PORT,
    type: 'postgres',
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
    synchronize: true, // just for dev mode
  }),
);