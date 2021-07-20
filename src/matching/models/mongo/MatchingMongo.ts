import { EntityMongo } from '../../../common/models/mongo/EntityMongo';
import { MatchingMongoStatus } from './MatchingMongoStatus';

export interface MatchingMongo extends EntityMongo {
  startup_uuid: string;
  status: MatchingMongoStatus;
  status_reason?: string;
  user_uuid: string;
}
