import mongodb from 'mongodb';

import { UserMongoDocument } from '../../models/mongo/UserMongoDocument';
import { UserMongoFixtures } from './UserMongoFixtures';

export class UserMongoDocumentFixtures {
  public static get withMandatory(): UserMongoDocument {
    const fixture: UserMongoDocument = {
      ...UserMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60f2f0c5f86f554d0715191b'),
    } as UserMongoDocument;

    return fixture;
  }
}
