import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(
  dotenv.config({ path: process.cwd() + '/development.env' }),
);

import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from '../config/db.config.development';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { UserFactory } from './user.factory';
import { PropertyFactory } from './property.factory';
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { MainSeeder } from './main.seeder';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [UserFactory, PropertyFactory, PropertyFeatureFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
