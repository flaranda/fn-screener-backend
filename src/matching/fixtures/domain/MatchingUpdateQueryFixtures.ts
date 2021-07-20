import { MatchingUpdateQuery } from '../../models/domain/MatchingUpdateQuery';
import { MatchingFixtures } from './MatchingFixtures';

export class MatchingUpdateQueryFixtures {
  public static get withMandatory(): MatchingUpdateQuery {
    const fixture: MatchingUpdateQuery = {
      uuid: MatchingFixtures.withMandatory.uuid,
    };

    return fixture;
  }

  public static get withAll(): MatchingUpdateQuery {
    const fixture: MatchingUpdateQuery = {
      ...this.withMandatory,
      status: MatchingFixtures.withMandatory.status,
      statusReason: MatchingFixtures.withStatusReason.statusReason as string,
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

  public static get withStatusReason(): MatchingUpdateQuery {
    const fixture: MatchingUpdateQuery = {
      ...this.withMandatory,
      statusReason: MatchingFixtures.withStatusReason.statusReason as string,
    };

    return fixture;
  }
}
