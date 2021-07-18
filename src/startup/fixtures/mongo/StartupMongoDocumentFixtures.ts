import mongodb from 'mongodb';

import { StartupMongoDocument } from '../../models/mongo/StartupMongoDocument';
import { StartupMongoFixtures } from './StartupMongoFixtures';

export class StartupMongoDocumentFixtures {
  public static get withMandatory(): StartupMongoDocument {
    const fixture: StartupMongoDocument = {
      ...StartupMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60f45b4054bca2209c471ffa'),
    } as StartupMongoDocument;

    return fixture;
  }
}
