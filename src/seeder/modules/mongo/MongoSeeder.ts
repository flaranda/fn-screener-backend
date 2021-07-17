import * as inversify from 'inversify';

import { ISeeder } from '../../../common/interfaces/ISeeder';
import { criteriaInjectionTypes } from '../../../criteria/inversify/criteriaInjectionTypes';
import { userCriteriaInjectionTypes } from '../../../user-criteria/inversify/userCriteriaInjectionTypes';
import { userInjectionTypes } from '../../../user/inversify/userInjectionTypes';

@inversify.injectable()
export class MongoSeeder implements ISeeder {
  constructor(
    @inversify.inject(criteriaInjectionTypes.CriteriaMongoSeeder)
    private readonly criteriaMongoSeeder: ISeeder,
    @inversify.inject(userInjectionTypes.UserMongoSeeder)
    private readonly userMongoSeeder: ISeeder,
    @inversify.inject(userCriteriaInjectionTypes.UserCriteriaMongoSeeder)
    private readonly userCriteriaMongoSeeder: ISeeder,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding MongoDb');

    console.log('Seeding Criteria MongoDb');
    await this.criteriaMongoSeeder.seed();

    console.log('Seeding User MongoDb');
    await this.userMongoSeeder.seed();

    console.log('Seeding UserCriteria MongoDb');
    await this.userCriteriaMongoSeeder.seed();

    console.log('Finished seeding MongoDb');
  }
}
