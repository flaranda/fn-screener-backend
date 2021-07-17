import { CriteriaMongoFixtures } from '../../../criteria/fixtures/mongo/CriteriaMongoFixtures';
import { UserMongoFixtures } from '../../../user/fixtures/mongo/UserMongoFixtures';
import { UserCriteriaMongo } from '../../models/mongo/UserCriteriaMongo';
import { UserCriteriaMongoImportance } from '../../models/mongo/UserCriteriaMongoImportance';

export class UserCriteriaMongoFixtures {
  public static get withMandatory(): UserCriteriaMongo {
    const fixture: UserCriteriaMongo = {
      created_at: new Date('2021-07-17T00:00:00Z'),
      criteria_uuid: CriteriaMongoFixtures.withMandatory.uuid,
      importance: UserCriteriaMongoImportance.must_have,
      updated_at: new Date('2021-07-17T00:00:00Z'),
      user_uuid: UserMongoFixtures.withMandatory.uuid,
      uuid: 'ca062b0f-ff9f-41da-a223-05855ce0d1cd',
    };

    return fixture;
  }
}
