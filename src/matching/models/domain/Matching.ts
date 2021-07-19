import { Entity } from '../../../common/models/domain/Entity';
import { MatchingStatus } from './MatchingStatus';

export interface Matching extends Entity {
  readonly startupUuid: string;
  readonly status: MatchingStatus;
  readonly userUuid: string;
}
