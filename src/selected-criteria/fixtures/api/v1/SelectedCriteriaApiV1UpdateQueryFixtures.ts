import { SelectedCriteriaApiV1UpdateQuery } from '../../../models/api/v1/SelectedCriteriaApiV1UpdateQuery';
import { SelectedCriteriaApiV1Fixtures } from './SelectedCriteriaApiV1Fixtures';

export class SelectedCriteriaApiV1UpdateQueryFixtures {
  public static get withMandatory(): SelectedCriteriaApiV1UpdateQuery {
    const fixture: SelectedCriteriaApiV1UpdateQuery = {
      uuid: SelectedCriteriaApiV1Fixtures.withMandatory.uuid,
    };

    return fixture;
  }

  public static get withAll(): Required<SelectedCriteriaApiV1UpdateQuery> {
    const fixture: Required<SelectedCriteriaApiV1UpdateQuery> = {
      importance: SelectedCriteriaApiV1Fixtures.withMandatory.importance,
      uuid: SelectedCriteriaApiV1Fixtures.withMandatory.uuid,
    };

    return fixture;
  }

  public static get withInvalidContract(): unknown {
    const fixture: unknown = {
      unexpected_property: 'unexpected_value',
    };

    return fixture;
  }
}
