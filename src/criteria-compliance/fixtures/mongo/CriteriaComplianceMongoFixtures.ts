import { CriteriaMongoFixtures } from '../../../criteria/fixtures/mongo/CriteriaMongoFixtures';
import { StartupMongoFixtures } from '../../../startup/fixtures/mongo/StartupMongoFixtures';
import { CriteriaComplianceMongo } from '../../models/mongo/CriteriaComplianceMongo';
import { CriteriaComplianceMongoAnswer } from '../../models/mongo/CriteriaComplianceMongoAnswer';

export class CriteriaComplianceMongoFixtures {
  public static get withMandatory(): CriteriaComplianceMongo {
    const fixture: CriteriaComplianceMongo = {
      answer: CriteriaComplianceMongoAnswer.yes,
      created_at: new Date('2021-07-18T00:00:00Z'),
      criteria_uuid: CriteriaMongoFixtures.withMandatory.uuid,
      startup_uuid: StartupMongoFixtures.withMandatory.uuid,
      updated_at: new Date('2021-07-18T00:00:00Z'),
      uuid: 'f04e915f-5220-4eb4-b31b-f6c35923b63c',
    };

    return fixture;
  }
}
