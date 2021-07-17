import { CriteriaMongoFixtures } from '../../../criteria/fixtures/mongo/CriteriaMongoFixtures';
import { UserMongoFixtures } from '../../../user/fixtures/mongo/UserMongoFixtures';
import { SelectedCriteriaMongo } from '../../models/mongo/SelectedCriteriaMongo';
import { SelectedCriteriaMongoImportance } from '../../models/mongo/SelectedCriteriaMongoImportance';

export class SelectedCriteriaMongoFixtures {
  public static get withMandatory(): SelectedCriteriaMongo {
    const fixture: SelectedCriteriaMongo = {
      created_at: new Date('2021-07-17T00:00:00Z'),
      criteria_uuid: CriteriaMongoFixtures.withMandatory.uuid,
      importance: SelectedCriteriaMongoImportance.must_have,
      updated_at: new Date('2021-07-17T00:00:00Z'),
      user_uuid: UserMongoFixtures.withMandatory.uuid,
      uuid: 'ca062b0f-ff9f-41da-a223-05855ce0d1cd',
    };

    return fixture;
  }
}
