import { DataSource, DataSourceOptions } from 'typeorm';
import { PgConfig } from '../database/pg.config';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { UserFactory } from './user.factory';
import { PropertyFactory } from './property.factory';
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { MainSeeder } from './main.seeder';

const options: DataSourceOptions & SeederOptions = {
  ...PgConfig,
  factories: [UserFactory, PropertyFactory, PropertyFeatureFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
