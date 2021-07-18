import { EntityMongo } from '../../../common/models/mongo/EntityMongo';

export interface StartupMongo extends EntityMongo {
  name: string;
  url: string;
}
