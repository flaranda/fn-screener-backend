import { StartupMongoFixtures } from '../../../startup/fixtures/mongo/StartupMongoFixtures';
import { UserMongoFixtures } from '../../../user/fixtures/mongo/UserMongoFixtures';
import { MatchingMongo } from '../../models/mongo/MatchingMongo';
import { MatchingMongoStatus } from '../../models/mongo/MatchingMongoStatus';

export class MatchingMongoFixtures {
  public static get withMandatory(): MatchingMongo {
    const fixture: MatchingMongo = {
      created_at: new Date('2021-07-19T00:00:00Z'),
      startup_uuid: StartupMongoFixtures.withMandatory.uuid,
      status: MatchingMongoStatus.pending,
      updated_at: new Date('2021-07-19T00:00:00Z'),
      user_uuid: UserMongoFixtures.withMandatory.uuid,
      uuid: '783b1b15-712c-46ca-a9c3-2c17fe52c531',
    };

    return fixture;
  }
}
