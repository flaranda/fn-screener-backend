import { EntityMongo } from '../../../common/models/mongo/EntityMongo';

export interface CriteriaComplianceMongo extends EntityMongo {
  compliance: boolean;
  criteria_uuid: string;
  startup_uuid: string;
}
