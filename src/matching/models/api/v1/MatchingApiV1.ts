import { MatchingApiV1Analysis } from './MatchingApiV1Analysis';
import { MatchingApiV1Status } from './MatchingApiV1Status';

export interface MatchingApiV1 {
  analysis: MatchingApiV1Analysis;
  startup_name: string;
  startup_url: string;
  startup_uuid: string;
  status: MatchingApiV1Status;
  uuid: string;
}
