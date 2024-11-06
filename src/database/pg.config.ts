import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const PgConfig: PostgresConnectionOptions = {
  url: 'postgresql://nest-postgresdb_owner:rH6FlELjgN2z@ep-morning-silence-a543v9i7.us-east-2.aws.neon.tech/nest-postgresdb?sslmode=require',
  port: 3306,
  type: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // just for dev mode
};
