import url from 'url';

import { Entity } from '../../../common/models/domain/Entity';

export interface Startup extends Entity {
  readonly name: string;
  readonly url: url.URL;
}
