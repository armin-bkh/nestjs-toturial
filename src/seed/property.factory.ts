import { setSeederFactory } from 'typeorm-extension';
import { Property } from '../entities/property.entity';
import { faker } from '@faker-js/faker';

export const PropertyFactory = setSeederFactory(Property, () => {
  const property = new Property();

  property.name = faker.location.street();
  property.description = faker.lorem.sentence();
  property.price = parseInt(faker.commerce.price({ min: 10000, max: 25000 }));

  return property;
});
