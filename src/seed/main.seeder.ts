import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PropertyType } from '../entities/propertyType.entity';
import { User } from '../entities/user.entity';
import { Property } from '../entities/property.entity';
import { faker } from '@faker-js/faker';
import { PropertyFeature } from '../entities/propertyFeature.entity';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const propertyTypeRepo = dataSource.getRepository(PropertyType);
    console.log('seeding propertyTypes...');
    const propertyTypes = await propertyTypeRepo.save([
      { value: 'Apartment' },
      { value: 'Condo' },
    ]);
    console.log('seeding propertyTypes DONE');

    console.log('seeding users...');
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);
    console.log('seeding users DONE');

    console.log('seeding property & propertyFeature...');
    const propertyFactory = factoryManager.get(Property);
    const propertyFeatureFactory = factoryManager.get(PropertyFeature);
    const propertiesMock = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          return propertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyTypes),
            propertyFeature: await propertyFeatureFactory.save(),
            likedBy: faker.helpers.arrayElements(users),
          });
        }),
    );
    const propertyRepo = dataSource.getRepository(Property);
    await propertyRepo.save(propertiesMock);
    console.log('seeding property & propertyFeature DONE');
  }
}
