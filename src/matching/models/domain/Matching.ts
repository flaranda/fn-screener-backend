import { Entity } from '../../../common/models/domain/Entity';
import { MatchingAnalysis } from './MatchingAnalysis';
import { MatchingStatus } from './MatchingStatus';

export interface Matching extends Entity {
  readonly startupUuid: string;
  readonly status: MatchingStatus;
  readonly analysis: MatchingAnalysis;
  readonly userUuid: string;
}
