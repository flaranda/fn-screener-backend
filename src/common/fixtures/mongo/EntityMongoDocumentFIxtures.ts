import mongodb from 'mongodb';

import { EntityMongoDocument } from '../../models/mongo/EntityMongoDocument';
import { EntityMongoFixtures } from './EntityMongoFixtures';

export class EntityMongoDocumentFixtures {
  public static get withMandatory(): EntityMongoDocument {
    const fixture: EntityMongoDocument = {
      ...EntityMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60bf3a6e3da99a9370b0bf24'),
    } as EntityMongoDocument;

    return fixture;
  }
}
