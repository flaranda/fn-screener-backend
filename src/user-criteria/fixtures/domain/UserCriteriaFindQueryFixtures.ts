import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { UserCriteriaFindQuery } from '../../models/domain/UserCriteriaFindQuery';

export class UserCriteriaFindQueryFixtures {
  public static get withMandatory(): UserCriteriaFindQuery {
    const fixture: UserCriteriaFindQuery = {};

    return fixture;
  }

  public static get withUserUuid(): UserCriteriaFindQuery {
    const fixture: UserCriteriaFindQuery = {
      ...this.withMandatory,
      userUuid: UserFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}
