import { MatchingUpdateQuery } from '../../models/domain/MatchingUpdateQuery';
import { MatchingFixtures } from './MatchingFixtures';

export class MatchingUpdateQueryFixtures {
  public static get withMandatory(): MatchingUpdateQuery {
    const fixture: MatchingUpdateQuery = {
      uuid: MatchingFixtures.withMandatory.uuid,
    };

    return fixture;
  }

  public static get withStatus(): MatchingUpdateQuery {
    const fixture: MatchingUpdateQuery = {
      ...this.withMandatory,
      status: MatchingFixtures.withMandatory.status,
    };

    return fixture;
  }
}
