import { UserMongo } from './UserMongo';

export interface UserMongoSeed extends Partial<UserMongo> {
  name: string;
  email: string;
  uuid: string;
}
