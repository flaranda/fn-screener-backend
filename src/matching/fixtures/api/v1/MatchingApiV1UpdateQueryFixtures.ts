import { MatchingApiV1Status } from '../../../models/api/v1/MatchingApiV1Status';
import { MatchingApiV1UpdateQuery } from '../../../models/api/v1/MatchingApiV1UpdateQuery';

export class MatchingApiV1UpdateQueryFixtures {
  public static get withMandatory(): MatchingApiV1UpdateQuery {
    const fixture: MatchingApiV1UpdateQuery = {};

    return fixture;
  }

  public static get withAll(): Required<MatchingApiV1UpdateQuery> {
    const fixture: Required<MatchingApiV1UpdateQuery> = {
      ...this.withMandatory,
      status: MatchingApiV1Status.pending,
    };

    return fixture;
  }

  public static get withInvalidContract(): unknown {
    const fixture: unknown = 'unexpected_value';

    return fixture;
  }
}
