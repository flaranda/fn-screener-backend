import * as inversify from 'inversify';

import { ISeeder } from '../../../common/interfaces/ISeeder';
import { criteriaComplianceInjectionTypes } from '../../../criteria-compliance/inversify/criteriaComplianceInjectionTypes';
import { criteriaInjectionTypes } from '../../../criteria/inversify/criteriaInjectionTypes';
import { matchingInjectionTypes } from '../../../matching/inversify/matchingInjectionTypes';
import { selectedCriteriaInjectionTypes } from '../../../selected-criteria/inversify/selectedCriteriaInjectionTypes';
import { startupInjectionTypes } from '../../../startup/inversify/startupInjectionTypes';
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
    @inversify.inject(startupInjectionTypes.StartupMongoSeeder)
    private readonly startupMongoSeeder: ISeeder,
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceMongoSeeder,
    )
    private readonly criteriaComplianceMongoSeeder: ISeeder,
    @inversify.inject(matchingInjectionTypes.MatchingMongoSeeder)
    private readonly matchingMongoSeeder: ISeeder,
  ) {}

  public async seed(): Promise<void> {
    console.log('Seeding MongoDb');

    console.log('Seeding Criteria MongoDb');
    await this.criteriaMongoSeeder.seed();

    console.log('Seeding User MongoDb');
    await this.userMongoSeeder.seed();

    console.log('Seeding SelectedCriteria MongoDb');
    await this.selectedCriteriaMongoSeeder.seed();

    console.log('Seeding Startup MongoDb');
    await this.startupMongoSeeder.seed();

    console.log('Seeding CriteriaCompliance MongoDb');
    await this.criteriaComplianceMongoSeeder.seed();

    console.log('Seeding Matching MongoDb');
    await this.matchingMongoSeeder.seed();

    console.log('Finished seeding MongoDb');
  }
}
