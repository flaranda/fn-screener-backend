import { CriteriaApiV1Fixtures } from '../../../../criteria/fixtures/api/v1/CriteriaApiV1Fixtures';
import { UserCriteriaApiV1 } from '../../../models/api/v1/UserCriteriaApiV1';
import { UserCriteriaApiV1Importance } from '../../../models/api/v1/UserCriteriaApiV1Importance';

export class UserCriteriaApiV1Fixtures {
  public static get withMandatory(): UserCriteriaApiV1 {
    const fixture: UserCriteriaApiV1 = {
      criteria_name: CriteriaApiV1Fixtures.withMandatory.name,
      importance: UserCriteriaApiV1Importance.must_have,
      uuid: 'ca062b0f-ff9f-41da-a223-05855ce0d1cd',
    };

    return fixture;
  }
}
