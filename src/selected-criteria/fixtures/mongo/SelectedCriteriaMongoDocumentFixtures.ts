import mongodb from 'mongodb';

import { SelectedCriteriaMongoDocument } from '../../models/mongo/SelectedCriteriaMongoDocument';
import { SelectedCriteriaMongoFixtures } from './SelectedCriteriaMongoFixtures';

export class SelectedCriteriaMongoDocumentFixtures {
  public static get withMandatory(): SelectedCriteriaMongoDocument {
    const fixture: SelectedCriteriaMongoDocument = {
      ...SelectedCriteriaMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60f209ac65ab1f840283d3e8'),
    } as SelectedCriteriaMongoDocument;

    return fixture;
  }
}
