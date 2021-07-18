import { EntityMongo } from '../../../common/models/mongo/EntityMongo';

export interface CriteriaComplianceMongo extends EntityMongo {
  readonly compliance: boolean;
  readonly criteria_uuid: string;
  readonly startup_uuid: string;
}
