import mongodb from 'mongodb';

import { CriteriaMongoDocument } from '../../models/mongo/CriteriaMongoDocument';
import { CriteriaMongoFixtures } from './CriteriaMongoFixtures';

export class CriteriaMongoDocumentFixtures {
  public static get withMandatory(): CriteriaMongoDocument {
    const fixture: CriteriaMongoDocument = {
      ...CriteriaMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60f209ac65ab1f840283d3e8'),
    } as CriteriaMongoDocument;

    return fixture;
  }
}
