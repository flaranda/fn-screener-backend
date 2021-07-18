import { CriteriaApiV1Fixtures } from '../../../../criteria/fixtures/api/v1/CriteriaApiV1Fixtures';
import { SelectedCriteriaApiV1 } from '../../../models/api/v1/SelectedCriteriaApiV1';
import { SelectedCriteriaApiV1Importance } from '../../../models/api/v1/SelectedCriteriaApiV1Importance';

export class SelectedCriteriaApiV1Fixtures {
  public static get withMandatory(): SelectedCriteriaApiV1 {
    const fixture: SelectedCriteriaApiV1 = {
      criteria_name: CriteriaApiV1Fixtures.withMandatory.name,
      criteria_uuid: CriteriaApiV1Fixtures.withMandatory.uuid,
      importance: SelectedCriteriaApiV1Importance.must_have,
      uuid: 'ca062b0f-ff9f-41da-a223-05855ce0d1cd',
    };

    return fixture;
  }
}
