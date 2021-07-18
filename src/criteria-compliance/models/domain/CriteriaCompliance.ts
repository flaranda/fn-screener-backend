import { Entity } from '../../../common/models/domain/Entity';

export interface CriteriaCompliance extends Entity {
  readonly compliance: boolean;
  readonly criteriaUuid: string;
  readonly startupUuid: string;
}
