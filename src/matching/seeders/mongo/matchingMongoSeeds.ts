import { startupMongoSeeds } from '../../../startup/seeder/mongo/startupMongoSeeds';
import { userMongoSeeds } from '../../../user/seeder/mongo/userMongoSeeds';
import { MatchingMongoSeed } from '../../models/mongo/MatchingMongoSeed';
import { MatchingMongoStatus } from '../../models/mongo/MatchingMongoStatus';

export const matchingMongoSeeds: MatchingMongoSeed[] = [
  {
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    status: MatchingMongoStatus.pending,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: '537e5131-4e3e-4a69-b534-a03232d75369',
  },
];
