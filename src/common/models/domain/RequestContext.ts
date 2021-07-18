import { SelectedCriteria } from '../../../selected-criteria/models/domain/SelectedCriteria';
import { User } from '../../../user/models/domain/User';
import { ApiVersion } from './ApiVersion';

export interface RequestContext {
  apiVersion?: ApiVersion;
  selectedCriteria?: SelectedCriteria;
  user?: User;
}
