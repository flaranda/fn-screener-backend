import mongodb from 'mongodb';

import { UserCriteriaMongoDocument } from '../../models/mongo/UserCriteriaMongoDocument';
import { UserCriteriaMongoFixtures } from './UserCriteriaMongoFixtures';

export class UserCriteriaMongoDocumentFixtures {
  public static get withMandatory(): UserCriteriaMongoDocument {
    const fixture: UserCriteriaMongoDocument = {
      ...UserCriteriaMongoFixtures.withMandatory,
      _id: new mongodb.ObjectId('60f209ac65ab1f840283d3e8'),
    } as UserCriteriaMongoDocument;

    return fixture;
  }
}
