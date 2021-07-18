import { CriteriaCompliance } from '../../../criteria-compliance/models/domain/CriteriaCompliance';
import { Matching } from '../../../matching/models/domain/Matching';
import { SelectedCriteria } from '../../../selected-criteria/models/domain/SelectedCriteria';
import { User } from '../../../user/models/domain/User';
import { ApiVersion } from './ApiVersion';

export interface RequestContext {
  apiVersion?: ApiVersion;
  criteriaCompliance?: CriteriaCompliance;
  matching?: Matching;
  selectedCriteria?: SelectedCriteria;
  user?: User;
}
