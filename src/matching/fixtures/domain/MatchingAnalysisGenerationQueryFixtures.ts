import { StartupFixtures } from '../../../startup/fixtures/domain/StartupFixtures';
import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { MatchingAnalysisGenerationQuery } from '../../models/domain/MatchingAnalysisGenerationQuery';

export class MatchingAnalysisGenerationQueryFixtures {
  public static get withMandatory(): MatchingAnalysisGenerationQuery {
    const fixture: MatchingAnalysisGenerationQuery = {
      startupUuid: StartupFixtures.withMandatory.uuid,
      userUuid: UserFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}
