import * as inversify from 'inversify';

import { ISeeder } from '../../../common/interfaces/ISeeder';
import { criteriaInjectionTypes } from '../../../criteria/inversify/criteriaInjectionTypes';

@inversify.injectable()
export class MongoSeeder implements ISeeder {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriaMongoSeeder)
    private readonly criteriaMongoSeeder: ISeeder,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding MongoDb');

    console.log('Seeding Criteria MongoDb');
    await this.criteriaMongoSeeder.seed();

    console.log('Finished seeding MongoDb');
  }
}
