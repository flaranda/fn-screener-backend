import { StartupMongo } from './StartupMongo';

export interface StartupMongoSeed extends Partial<StartupMongo> {
  name: string;
  url: string;
  uuid: string;
}
