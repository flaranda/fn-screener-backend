import { MatchingApiV1 } from '../../../models/api/v1/MatchingApiV1';
import { MatchingApiV1Status } from '../../../models/api/v1/MatchingApiV1Status';

export class MatchingApiV1Fixtures {
  public static get withMandatory(): MatchingApiV1 {
    const fixture: MatchingApiV1 = {
      status: MatchingApiV1Status.pending,
    };

    return fixture;
  }
}
