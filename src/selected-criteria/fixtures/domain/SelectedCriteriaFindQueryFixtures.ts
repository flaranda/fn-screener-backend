import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { SelectedCriteriaFindQuery } from '../../models/domain/SelectedCriteriaFindQuery';

export class SelectedCriteriaFindQueryFixtures {
  public static get withMandatory(): SelectedCriteriaFindQuery {
    const fixture: SelectedCriteriaFindQuery = {};

    return fixture;
  }

  public static get withUserUuid(): SelectedCriteriaFindQuery {
    const fixture: SelectedCriteriaFindQuery = {
      ...this.withMandatory,
      userUuid: UserFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}
