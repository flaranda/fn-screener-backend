import { MatchingMongo } from './MatchingMongo';
import { MatchingMongoStatus } from './MatchingMongoStatus';

export interface MatchingMongoSeed extends Partial<MatchingMongo> {
  startup_uuid: string;
  status: MatchingMongoStatus;
  user_uuid: string;
  uuid: string;
}
