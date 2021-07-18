import { EntityMongo } from '../../../common/models/mongo/EntityMongo';
import { MatchingMongoStatus } from './MatchingMongoStatus';

export interface MatchingMongo extends EntityMongo {
  startup_uuid: string;
  status: MatchingMongoStatus;
  user_uuid: string;
}
