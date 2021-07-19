import { StartupFixtures } from '../../../startup/fixtures/domain/StartupFixtures';
import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { Matching } from '../../models/domain/Matching';
import { MatchingStatus } from '../../models/domain/MatchingStatus';

export class MatchingFixtures {
  public static get withMandatory(): Matching {
    const fixture: Matching = {
      createdAt: new Date('2021-07-19T00:00:00Z'),
      startupUuid: StartupFixtures.withMandatory.uuid,
      status: MatchingStatus.Pending,
      updatedAt: new Date('2021-07-19T00:00:00Z'),
      userUuid: UserFixtures.withMandatory.uuid,
      uuid: '783b1b15-712c-46ca-a9c3-2c17fe52c531',
    };

    return fixture;
  }
}
