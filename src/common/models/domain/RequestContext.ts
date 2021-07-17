import { User } from '../../../user/models/domain/User';
import { ApiVersion } from './ApiVersion';

export interface RequestContext {
  apiVersion?: ApiVersion;
  user?: User;
}
