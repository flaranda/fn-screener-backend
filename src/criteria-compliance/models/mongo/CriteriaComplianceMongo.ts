import { EntityMongo } from '../../../common/models/mongo/EntityMongo';
import { CriteriaComplianceMongoAnswer } from './CriteriaComplianceMongoAnswer';

export interface CriteriaComplianceMongo extends EntityMongo {
  answer: CriteriaComplianceMongoAnswer;
  criteria_uuid: string;
  startup_uuid: string;
}
