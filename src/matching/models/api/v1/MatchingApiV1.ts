import { MatchingApiV1Analysis } from './MatchingApiV1Analysis';
import { MatchingApiV1Status } from './MatchingApiV1Status';

export interface MatchingApiV1 {
  readonly analysis: MatchingApiV1Analysis;
  readonly startup_name: string;
  readonly startup_url: string;
  readonly startup_uuid: string;
  readonly status: MatchingApiV1Status;
  readonly status_reason: string | null;
  readonly uuid: string;
}
