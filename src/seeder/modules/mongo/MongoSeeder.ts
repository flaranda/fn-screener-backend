import * as inversify from 'inversify';

import { ISeeder } from '../../../common/interfaces/ISeeder';
import { criteriaInjectionTypes } from '../../../criteria/inversify/criteriaInjectionTypes';
import { selectedCriteriaInjectionTypes } from '../../../selected-criteria/inversify/selectedCriteriaInjectionTypes';
import { userInjectionTypes } from '../../../user/inversify/userInjectionTypes';

@inversify.injectable()
export class MongoSeeder implements ISeeder {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriaMongoSeeder)
    private readonly criteriaMongoSeeder: ISeeder,
    @inversify.inject(userInjectionTypes.UserMongoSeeder)
    private readonly userMongoSeeder: ISeeder,
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaMongoSeeder,
    )
    private readonly selectedCriteriaMongoSeeder: ISeeder,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding MongoDb');

    console.log('Seeding Criteria MongoDb');
    await this.criteriaMongoSeeder.seed();

    console.log('Seeding User MongoDb');
    await this.userMongoSeeder.seed();

    console.log('Seeding SelectedCriteria MongoDb');
    await this.selectedCriteriaMongoSeeder.seed();

    console.log('Finished seeding MongoDb');
  }
}
