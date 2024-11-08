import { setSeederFactory } from 'typeorm-extension';
import { PropertyFeature } from '../entities/propertyFeature.entity';
import { faker } from '@faker-js/faker';

export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, () => {
  const propertyFeature = new PropertyFeature();
  propertyFeature.area = faker.number.int({ min: 20, max: 50 });
  propertyFeature.bathrooms = faker.number.int({ min: 1, max: 3 });
  propertyFeature.bedrooms = faker.number.int({ min: 1, max: 4 });
  propertyFeature.parkingSpots = faker.number.int({ min: 0, max: 2 });
  propertyFeature.hasBalcony = faker.datatype.boolean();
  propertyFeature.hasSwimmingPool = faker.datatype.boolean();
  propertyFeature.hasGardenYard = faker.datatype.boolean();

  return propertyFeature;
});
