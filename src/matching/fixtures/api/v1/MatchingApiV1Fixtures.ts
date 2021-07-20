import { MatchingApiV1 } from '../../../models/api/v1/MatchingApiV1';
import { MatchingApiV1Status } from '../../../models/api/v1/MatchingApiV1Status';
import { MatchingApiV1AnalysisFixtures } from './MatchingApiV1AnalysisFixtures';

export class MatchingApiV1Fixtures {
  public static get withMandatory(): MatchingApiV1 {
    const fixture: MatchingApiV1 = {
      analysis: MatchingApiV1AnalysisFixtures.withMandatory,
      startup_name: 'Blissey',
      startup_url: 'https://some-startup-domain.com/',
      startup_uuid: '1039fd3f-1614-4d85-8588-fba871d7e351',
      status: MatchingApiV1Status.pending,
      status_reason: null,
      uuid: '783b1b15-712c-46ca-a9c3-2c17fe52c531',
    };

    return fixture;
  }
}
