import { CriteriaMongo } from './CriteriaMongo';

export interface CriteriaMongoSeed extends Partial<CriteriaMongo> {
  name: string;
  uuid: string;
}
