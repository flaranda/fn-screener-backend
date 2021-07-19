import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { MatchingFindQuery } from '../../models/domain/MatchingFindQuery';

export class MatchingFindQueryFixtures {
  public static get withMandatory(): MatchingFindQuery {
    const fixture: MatchingFindQuery = {};

    return fixture;
  }

  public static get withUserUuid(): MatchingFindQuery {
    const fixture: MatchingFindQuery = {
      ...this.withMandatory,
      userUuid: UserFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}
