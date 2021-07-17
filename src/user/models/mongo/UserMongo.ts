import { EntityMongo } from '../../../common/models/mongo/EntityMongo';

export interface UserMongo extends EntityMongo {
  name: string;
  email: string;
}
