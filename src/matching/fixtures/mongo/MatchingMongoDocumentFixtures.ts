import mongodb from 'mongodb';

import { MatchingMongoDocument } from '../../models/mongo/MatchingMongoDocument';
import { MatchingMongoFixtures } from './MatchingMongoFixtures';

export class MatchingMongoDocumentFixtures {
  public static get withMandatory(): MatchingMongoDocument {
    const fixture: MatchingMongoDocument = {
      ...MatchingMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60f55567b291014e5b7484de'),
    } as MatchingMongoDocument;

    return fixture;
  }
}
