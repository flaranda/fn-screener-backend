import { Entity } from '../../../common/models/domain/Entity';
import { UserCriteriaImportance } from './UserCriteriaImportance';

export interface UserCriteria extends Entity {
  readonly criteriaUuid: string;
  readonly importance: UserCriteriaImportance;
  readonly userUuid: string;
}
