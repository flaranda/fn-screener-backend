import { MatchingApiV1Status } from './MatchingApiV1Status';

export interface MatchingApiV1UpdateQuery {
  status?: MatchingApiV1Status;
  status_reason?: string;
}
